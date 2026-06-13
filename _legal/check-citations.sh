#!/usr/bin/env bash
# Arbiter LE — legal citation gate (the "no-memory gate", deliverable #2)
#
# Blocks the failure modes that have actually bitten us:
#   1. An OVERRULED case taught as current law (e.g. Commonwealth v. Gary).
#   2. A known statute conflation (Act 57 = hiring law, never use-of-force/de-escalation).
#   3. Any case citation that is not in _legal/citations-registry.md (advisory — verify it).
#
# Usage:
#   _legal/check-citations.sh [file ...]   # scan specific files
#   _legal/check-citations.sh              # scan staged files (pre-commit); else all live content
#
# Exit 0 = clean. Exit 1 = hard violation — do not commit until fixed.
# Wire as a pre-commit hook:  ln -s ../../_legal/check-citations.sh .git/hooks/pre-commit
#
# Compatible with macOS bash 3.2 (no mapfile).

set -uo pipefail
cd "$(git rev-parse --show-toplevel)" 2>/dev/null || { echo "not a git repo"; exit 2; }
REGISTRY="_legal/citations-registry.md"

# ---------- choose target files ----------
FILES=()
if [ "$#" -gt 0 ]; then
  for f in "$@"; do FILES+=("$f"); done
else
  staged=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null | grep -E '\.(js|html)$' || true)
  if [ -n "$staged" ]; then
    while IFS= read -r f; do [ -n "$f" ] && FILES+=("$f"); done <<< "$staged"
  else
    while IFS= read -r f; do [ -n "$f" ] && FILES+=("$f"); done < <(git ls-files 'js/*.js' 'index.html')
  fi
fi
# keep only files that exist on disk
EXIST=(); for f in "${FILES[@]:-}"; do [ -f "$f" ] && EXIST+=("$f"); done
FILES=("${EXIST[@]:-}")
[ "${#FILES[@]}" -eq 0 ] && { echo "No JS/HTML files to scan."; exit 0; }

echo "Scanning ${#FILES[@]} file(s) against $REGISTRY"
fail=0

# ---------- 1. OVERRULED authorities: only allowed with explicit overruled framing ----------
# Add future overruled cases here:  name|allowed-context
OVERRULED_NAMES='Commonwealth v\. Gary'
CTX='overrul|OVERRULED|historical|no longer|superseded|do not rely'
while IFS= read -r hit; do
  [ -z "$hit" ] && continue
  if ! printf '%s' "$hit" | grep -qiE "$CTX"; then
    echo "  BLOCK  overruled law presented as current → $hit"
    fail=1
  fi
done < <(grep -rnE "$OVERRULED_NAMES" "${FILES[@]}" 2>/dev/null)

# ---------- 2. Known statute conflations ----------
# Act 57 of 2020 is the police HIRING / separation-database law. It must never be
# tied to use of force or de-escalation (that is Act 59 of 2020).
while IFS= read -r hit; do
  [ -z "$hit" ] && continue
  echo "  BLOCK  Act 57 (hiring law) tied to force/de-escalation → $hit"
  fail=1
done < <(grep -rniE "Act 57 of 2020" "${FILES[@]}" 2>/dev/null | grep -iE "de-?escalat|use of force|reportable|force report")

# ---------- 3. Unregistered citations (advisory) ----------
found=$(grep -rhoE "[A-Z][A-Za-z']+ v\. [A-Z][A-Za-z']+" "${FILES[@]}" 2>/dev/null | sort -u)
while IFS= read -r cite; do
  [ -z "$cite" ] && continue
  if ! grep -qF "$cite" "$REGISTRY" 2>/dev/null; then
    echo "  VERIFY unregistered citation (not in registry): $cite"
  fi
done <<< "$found"

echo "---"
if [ "$fail" -ne 0 ]; then
  echo "FAIL: hard legal-citation violation(s). Do not commit until fixed."
  exit 1
fi
echo "PASS: no overruled-as-current law and no known conflations."
echo "      Resolve any VERIFY lines above against $REGISTRY before shipping."
exit 0
