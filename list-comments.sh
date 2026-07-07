#!/usr/bin/env bash
set -euo pipefail

GUESTBOOK_URL="https://reeyuki-guestbook.liventcord-a60.workers.dev"
TOKEN_FILE="${HOME}/.config/guestbook-admin/token"

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: 'jq' is required. Install it (apt install jq, pacman -S jq, etc)."
  exit 1
fi

fetch_json() {
  curl -sf "$@" 2>/dev/null || echo ""
}

echo "=== Approved Comments ==="
page=1
total_pages=1
while [ "$page" -le "$total_pages" ]; do
  data=$(fetch_json "${GUESTBOOK_URL}/?page=${page}&limit=50")
  [ -z "$data" ] && { echo "Failed to fetch page $page"; exit 1; }

  total_pages=$(echo "$data" | jq '.totalPages // 1')
  total=$(echo "$data" | jq '.total // 0')

  if [ "$page" -eq 1 ] && [ "$total" -eq 0 ]; then
    echo "  (none)"
  fi

  echo "$data" | jq -r '
    .messages[] | [
      "  [#" + (.id | tostring) + "]",
      (.name | gsub("\n"; " ")),
      "(" + (.timestamp[:10]) + ")",
      (.message | gsub("\n"; " "))
    ] | join(" ")
  ' 2>/dev/null || true

  page=$((page + 1))
done

echo ""

if [ -f "$TOKEN_FILE" ]; then
  ADMIN_TOKEN=$(cat "$TOKEN_FILE" | tr -d '\n\r')

  echo "=== Pending (Unmoderated) Comments ==="
  pending=$(fetch_json \
    -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    "${GUESTBOOK_URL}/admin/pending")

  if [ -z "$pending" ]; then
    echo "  Failed to fetch or unauthorized."
  else
    count=$(echo "$pending" | jq '.messages | length')
    if [ "$count" -eq 0 ]; then
      echo "  (none)"
    else
      echo "$pending" | jq -r '
        .messages[] | [
          "  [#" + (.id | tostring) + "]",
          (.name | gsub("\n"; " ")),
          "(" + (.timestamp[:10]) + ")",
          (.message | gsub("\n"; " "))
        ] | join(" ")
      '
    fi
  fi
else
  echo "=== Pending (Unmoderated) Comments ==="
  echo "  (no admin token found at $TOKEN_FILE — skipping)"
fi
