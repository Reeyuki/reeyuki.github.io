#!/usr/bin/env bash
set -euo pipefail

GUESTBOOK_URL="https://reeyuki-guestbook.liventcord-a60.workers.dev"
CONFIG_DIR="${HOME}/.config/guestbook-admin"
TOKEN_FILE="${CONFIG_DIR}/token"

die() {
  dialog --msgbox "Error: $1" 6 50
  exit 1
}

if ! command -v dialog >/dev/null 2>&1; then
  echo "Error: 'dialog' is required but not installed."
  echo "Install it with your package manager (e.g. apt install dialog, pacman -S dialog)."
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: 'jq' is required but not installed."
  echo "Install it with your package manager (e.g. apt install jq, pacman -S jq)."
  exit 1
fi

if [ ! -f "$TOKEN_FILE" ]; then
  echo "Error: Admin token not found at $TOKEN_FILE"
  echo ""
  echo "To set it up:"
  echo "  mkdir -p '$CONFIG_DIR'"
  echo "  echo 'your-admin-token' > '$TOKEN_FILE'"
  echo "  chmod 600 '$TOKEN_FILE'"
  exit 1
fi

ADMIN_TOKEN=$(cat "$TOKEN_FILE" | tr -d '\n\r')

fetch_pending() {
  curl -sf \
    -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    "${GUESTBOOK_URL}/admin/pending" 2>/dev/null || echo ""
}

approve_comment() {
  local id="$1"
  curl -sf -X PATCH \
    -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    "${GUESTBOOK_URL}/admin/approve/${id}" >/dev/null 2>&1
}

delete_comment() {
  local id="$1"
  curl -sf -X DELETE \
    -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    "${GUESTBOOK_URL}/admin/delete/${id}" >/dev/null 2>&1
}

# Truncate string to max N chars, appending "…" if cut
trunc() {
  local s="$1" max="$2"
  if [ ${#s} -gt "$max" ]; then
    echo "${s:0:$((max-1))}…"
  else
    echo "$s"
  fi
}

main_menu() {
  local pending_json
  pending_json=$(fetch_pending)
  if [ -z "$pending_json" ]; then
    dialog --msgbox "Failed to connect or unauthorized.\nCheck your token and network." 7 50
    return
  fi

  local count
  count=$(echo "$pending_json" | jq '.messages | length')

  if [ "$count" -eq 0 ]; then
    dialog --msgbox "No pending comments to moderate." 6 40
    return
  fi

  # Build checklist items
  local items=()
  while IFS=$'\t' read -r id name message date; do
    local preview
    preview="$(trunc "$name" 20): $(trunc "$message" 40) ($date)"
    items+=("$id" "$preview" "on")
  done < <(
    echo "$pending_json" | jq -r '
      .messages[] | [
        .id,
        (.name | gsub("\t"; " ")),
        (.message | gsub("\t"; " ")),
        (.timestamp[:10])
      ] | @tsv
    '
  )

  if [ ${#items[@]} -eq 0 ]; then
    dialog --msgbox "No pending comments to moderate." 6 40
    return
  fi

  local checklist_output
  checklist_output=$(dialog --stdout \
    --title "Guestbook Moderation" \
    --checklist "Select comments to moderate (${count} pending):" \
    20 70 10 \
    "${items[@]}")

  local exitcode=$?
  if [ "$exitcode" != 0 ] || [ -z "$checklist_output" ]; then
    return
  fi

  # Parse selected IDs (dialog returns space-separated quoted strings)
  local selected_ids=()
  eval "for id in $checklist_output; do selected_ids+=(\$id); done"

  if [ ${#selected_ids[@]} -eq 0 ]; then
    return
  fi

  local action
  action=$(dialog --stdout \
    --title "Action" \
    --menu "What to do with ${#selected_ids[@]} selected comment(s)?" \
    12 50 3 \
    "approve" "Approve selected comments" \
    "delete" "Delete selected comments" \
    "back" "Go back")

  case "$action" in
    approve)
      dialog --yesno "Approve ${#selected_ids[@]} comment(s)?" 6 45 || return
      local ok=0 fail=0
      for id in "${selected_ids[@]}"; do
        if approve_comment "$id"; then
          ((ok++))
        else
          ((fail++))
        fi
      done
      dialog --msgbox "Approved: $ok\nFailed: $fail" 7 40
      ;;
    delete)
      dialog --yesno "Delete ${#selected_ids[@]} comment(s)?\nThis cannot be undone." 7 50 || return
      local ok=0 fail=0
      for id in "${selected_ids[@]}"; do
        if delete_comment "$id"; then
          ((ok++))
        else
          ((fail++))
        fi
      done
      dialog --msgbox "Deleted: $ok\nFailed: $fail" 7 40
      ;;
    back|*)
      return
      ;;
  esac
}

while true; do
  main_menu
  if [ $? -ne 0 ]; then
    break
  fi
  dialog --yesno "Moderate more comments?" 6 40 || break
done

clear
