#!/usr/bin/env bash
set -euo pipefail
#
# Guestbook moderation — modern TUI (fzf + bat)
#
#  - Left: searchable list (fuzzy, multi-select with TAB)
#  - Right: LIVE full-message preview (never truncated)
#  - Batch: select many → approve/delete once, plus approve-all
#
# Keys in list:
#   TAB / Shift-TAB .... select / unselect
#   Ctrl-A .............. select all | Ctrl-D ... deselect all
#   Ctrl-T .............. toggle all
#   type to fuzzy-search, ENTER to confirm, ESC to cancel
#

GUESTBOOK_URL="https://reeyuki.netlify.app/api/guestbook"
CONFIG_DIR="${HOME}/.config/guestbook-admin"
TOKEN_FILE="${CONFIG_DIR}/token"

# ---------- deps ----------
need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Error: '$1' is required but not installed."
    case "$1" in
      fzf) echo "Install: pacman -S fzf / apt install fzf / brew install fzf" ;;
      jq) echo "Install: pacman -S jq / apt install jq / brew install jq" ;;
    esac
    exit 1
  }
}
need fzf
need jq

HAS_BAT=0; command -v bat >/dev/null 2>&1 && HAS_BAT=1
HAS_GLOW=0; command -v glow >/dev/null 2>&1 && HAS_GLOW=1

if [ ! -f "$TOKEN_FILE" ]; then
  echo "Error: Admin token not found at $TOKEN_FILE"
  echo ""
  echo "To set it up:"
  echo "  mkdir -p '$CONFIG_DIR'"
  echo "  echo 'your-admin-token' > '$TOKEN_FILE'"
  echo "  chmod 600 '$TOKEN_FILE'"
  exit 1
fi
ADMIN_TOKEN=$(tr -d '\n\r' < "$TOKEN_FILE")

# ---------- style ----------
if [ -t 1 ] && command -v tput >/dev/null 2>&1; then
  B=$(tput bold); D=$(tput dim); R=$(tput sgr0)
  GREEN=$(tput setaf 2); RED=$(tput setaf 1); YELLOW=$(tput setaf 3)
  CYAN=$(tput setaf 6); MAGENTA=$(tput setaf 5); GRAY=$(tput setaf 8)
else
  B=""; D=""; R=""; GREEN=""; RED=""; YELLOW=""; CYAN=""; MAGENTA=""; GRAY=""
fi
say()  { printf '%s\n' "$*"; }
ok()   { printf '%s✓ %s%s\n' "$GREEN" "$*" "$R"; }
err()  { printf '%s✗ %s%s\n' "$RED" "$*" "$R"; }
info() { printf '%s%s%s\n' "$D" "$*" "$R"; }

TMPDIR=$(mktemp -d -t guestbook-mod.XXXXXX)
trap 'rm -rf "$TMPDIR"' EXIT
PENDING_FILE="$TMPDIR/pending.json"
LIST_FILE="$TMPDIR/list.tsv"
PREVIEW_DIR="$TMPDIR/msg"
mkdir -p "$PREVIEW_DIR"

# ---------- api ----------
fetch_pending() {
  curl -sf -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    "${GUESTBOOK_URL}/admin/pending" 2>/dev/null || echo ""
}

approve_comment() {
  curl -sf -X PATCH -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    "${GUESTBOOK_URL}/admin/approve/$1" >/dev/null 2>&1
}

delete_comment() {
  curl -sf -X DELETE -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    "${GUESTBOOK_URL}/admin/delete/$1" >/dev/null 2>&1
}

# ---------- build fzf list + per-message preview files ----------
# List line:  ID<TAB><styled display>
# Display shown; ID hidden via --with-nth but usable as {1} in preview.
build_cache() {
  local json="$1"
  : > "$LIST_FILE"
  rm -f "$PREVIEW_DIR"/*.txt
  echo "$json" | jq -r '
    .messages[] | [
      .id,
      (.name // "(no name)" | gsub("[\t\n\r]+"; " ")),
      (.timestamp // "" | .[0:16]),
      (.message // "" | gsub("[\t\n\r]+"; " "))
    ] | @tsv' |
  while IFS=$'\t' read -r id name ts snippet; do
    # one-line row for the list (snippet shortened, FULL text lives in preview)
    short=$(printf '%s' "$snippet" | cut -c1-90)
    # styled display: date · name — snippet  (ANSI, rendered with --ansi)
    display=$(printf '\e[2m%s\e[0m  \e[1;36m%s\e[0m  \e[2m—\e[0m %s' "$ts" "$name" "$short")
    printf '%s\t%s\n' "$id" "$display" >> "$LIST_FILE"
    # full preview file (plain text, bat adds colour at view time)
    {
      echo "From: $name"
      echo "Date: $ts"
      echo "ID:   $id"
      echo "────────────────────────────────────────"
      echo ""
      echo "$json" | jq -r --arg id "$id" '.messages[] | select(.id==$id) | .message // "(empty)"'
    } > "$PREVIEW_DIR/${id}.txt"
  done
}

# Pager for a full message: bat > glow > less > cat
page_file() {
  local f="$1" title="$2"
  if [ "$HAS_BAT" -eq 1 ]; then
    bat --color=always --style=plain --wrap=character \
      --terminal-width="$(tput cols 2>/dev/null || echo 80)" \
      --file-name="$title" "$f" | "${PAGER:-less -R}" 2>/dev/null || cat "$f"
  elif [ "$HAS_GLOW" -eq 1 ]; then
    glow -w "$(tput cols 2>/dev/null || echo 80)" "$f" 2>/dev/null || cat "$f"
  else
    "${PAGER:-less -R}" "$f" 2>/dev/null || cat "$f"
  fi
}

view_full() {
  local id="$1"
  local f="$PREVIEW_DIR/${id}.txt"
  [ -f "$f" ] || { err "No cached text for $id"; return 0; }
  local name
  name=$(head -n1 "$f" | sed 's/^From: //')
  clear
  say "${B}${CYAN}━━ Full message · $name ━━${R}"
  page_file "$f" "$name"
}

view_full_many() {
  local f="$TMPDIR/combined.txt"
  : > "$f"
  for id in "$@"; do
    [ -f "$PREVIEW_DIR/${id}.txt" ] && {
      echo "════════════════════════════════════════" >> "$f"
      cat "$PREVIEW_DIR/${id}.txt" >> "$f"
      echo "" >> "$f"
    }
  done
  clear
  say "${B}${CYAN}━━ $# selected messages ━━${R}"
  page_file "$f" "$# selected"
}

# ---------- fzf pickers ----------
pick_messages() {
  local count="$1"
  local preview_cmd="cat \"$PREVIEW_DIR/{1}.txt\""
  if [ "$HAS_BAT" -eq 1 ]; then
    preview_cmd="bat --color=always --style=plain --wrap=character --terminal-width=\$FZF_PREVIEW_COLUMNS --file-name={1} \"$PREVIEW_DIR/{1}.txt\" 2>/dev/null || cat \"$PREVIEW_DIR/{1}.txt\""
  fi
  fzf \
    --style full \
    --layout reverse \
    --border rounded \
    --border-label " ✉ Guestbook · $count pending " \
    --input-label ' Search ' \
    --preview-label ' Full message ' \
    --header-label ' Help ' \
    --header $'TAB select • ENTER continue • CTRL-A all • CTRL-D none • CTRL-T toggle • type to filter' \
    --prompt '❯ ' \
    --pointer '▶' --marker '✓' \
    --multi --ansi \
    --highlight-line \
    --info inline-right \
    --delimiter '\t' --with-nth '2..' \
    --preview-window 'right:55%:wrap:border-rounded' \
    --preview "$preview_cmd" \
    --bind 'ctrl-a:select-all,ctrl-d:deselect-all,ctrl-t:toggle-all,tab:toggle+down,shift-tab:toggle+up,esc:cancel' \
    < "$LIST_FILE" || true
}

pick_action() {
  local n="$1"
  printf '%s\n' \
    "approve|✅ Approve $n selected" \
    "delete|❌ Delete $n selected" \
    "view|🔍 View full text (pager)" \
    "reselect|↩ Back to list" \
    "all-approve|✅✅ Approve ALL pending" \
    "quit|⏻ Quit" |
  fzf \
    --style full \
    --layout reverse \
    --border rounded \
    --border-label " Action · $n selected " \
    --prompt '❯ ' --pointer '▶' --highlight-line \
    --delimiter '|' --with-nth '2..' \
    --no-multi --height '40%' || true
}

# y/N confirm on /dev/tty (fzf is used for lists, plain prompt is clearer here):
confirm_yn() {
  local q="$1" ans
  printf '%s%s? [y/N]: %s' "$B$YELLOW" "$q" "$R"
  read -r ans < /dev/tty || return 1
  [[ "$ans" =~ ^[Yy]$ ]]
}

bulk_apply() {
  local action="$1"; shift
  local ok_n=0 fail_n=0 total=$#
  local i=0 id
  for id in "$@"; do
    i=$((i+1))
    printf '\r%s[%d/%d] %sing %s…%s' "$D" "$i" "$total" \
      "$([ "$action" = approve ] && echo approv || echo delet)" "$id" "$R"
    if [ "$action" = approve ]; then
      if approve_comment "$id"; then ok_n=$((ok_n+1)); else fail_n=$((fail_n+1)); fi
    else
      if delete_comment "$id"; then ok_n=$((ok_n+1)); else fail_n=$((fail_n+1)); fi
    fi
  done
  printf '\n'
  if [ "$action" = approve ]; then ok "Approved: $ok_n, failed: $fail_n"
  else ok "Deleted: $ok_n, failed: $fail_n"; fi
}

# ---------- main loop ----------
while true; do
  json=$(fetch_pending)
  if [ -z "$json" ] || ! echo "$json" | jq -e '.messages' >/dev/null 2>&1; then
    err "Failed to connect or unauthorized. Check token/network."
    exit 1
  fi
  count=$(echo "$json" | jq '.messages | length')
  if [ "$count" -eq 0 ]; then
    ok "No pending comments. All clear! 🎉"
    exit 0
  fi

  build_cache "$json"
  if [ ! -s "$LIST_FILE" ]; then
    ok "No pending comments. 🎉"
    exit 0
  fi

  clear
  say "${B}${CYAN}Guestbook Moderation${R} ${D}· $count pending · TAB=multi-select · preview=full text${R}"
  echo ""

  # shellcheck disable=SC2016
  selected=$(pick_messages "$count")
  if [ -z "${selected:-}" ]; then
    info "Nothing selected — refresh or quit? (r=refresh, any other key=quit)"
    read -rn1 -p "❯ " k < /dev/tty || k=q; echo ""
    [[ "$k" =~ ^[Rr]$ ]] && continue || break
  fi

  mapfile -t ids < <(printf '%s\n' "$selected" | cut -f1 -d$'\t')
  [ "${#ids[@]}" -eq 0 ] && continue

  while true; do
    clear
    say "${B}${GREEN}${#ids[@]} selected${R} ${D}· full text was in preview · pick an action${R}"
    raw=$(pick_action "${#ids[@]}")
    [ -z "${raw:-}" ] && break
    act=$(printf '%s' "$raw" | cut -d'|' -f1)

    case "$act" in
      view) view_full_many "${ids[@]}"; info "Press ENTER to continue…"; read -r _ < /dev/tty || true ;;
      approve)
        confirm_yn "Approve ${#ids[@]} comment(s)" || continue
        bulk_apply approve "${ids[@]}"
        break ;;
      delete)
        confirm_yn "DELETE ${#ids[@]} comment(s)? Cannot be undone" || continue
        bulk_apply delete "${ids[@]}"
        break ;;
      all-approve)
        confirm_yn "Approve ALL $count pending" || continue
        mapfile -t all < <(echo "$json" | jq -r '.messages[].id')
        bulk_apply approve "${all[@]}"
        break ;;
      reselect) break ;;
      quit|*) exit 0 ;;
    esac
  done

  info "Press ${B}ENTER${R}${D} to refresh, ${B}q${R}${D} to quit…${R}"
  read -rn1 -p "❯ " k < /dev/tty || k=q; echo ""
  [[ "$k" =~ ^[Qq]$ ]] && break
done

clear
say "${D}Bye!${R}"
