#!/usr/bin/env bash
# Arbiter LE — legal citation gate (the "no-memory gate", deliverable #2)
#
# Blocks the failure modes that have actually bitten us:
#   1. An OVERRULED case taught as current law (e.g. Commonwealth v. Gary).
#   2. A known statute conflation (Act 57 = hiring law, never use-of-force/de-escalation).
#   3. HALLUCINATION FIREWALL — any case or statute cite in content that is not
#      catalogued in _legal/citations-registry.md is a HARD BLOCK. A fabricated
#      case/statute (the most common AI hallucination, per the Charlotin database
#      of court sanctions) cannot ship because it was never hand-verified into the
#      registry against a primary source.
#   4. PENDING warning — a cite that is in the registry but not yet GOOD LAW
#      (primary-source verified) warns loudly; do not ship it in NEW content.
#
# This is the OFFLINE, deterministic wall — no network, never flaky. To confirm a
# case actually EXISTS before adding it to the registry, use the on-demand helper:
#   _legal/verify-citation.sh "Graham v. Connor" "490 U.S. 386"
# which queries CourtListener (a real legal database). The Charlotin hallucination
# site has no API and blocks bots; it is a manual quarterly read, not an auto-check.
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

# ---------- 3. HALLUCINATION FIREWALL: every cite in content must be in the registry ----------
# Tier A (BLOCK): cite appears nowhere in the registry → treat as a fabrication.
# Tier B (WARN):  cite is in the registry but on no GOOD LAW line (PENDING/other) →
#                 verified-pending; allowed in already-live content, never in new content.
# A cite on a GOOD LAW line passes silently. OVERRULED cases are handled in section 1.
registry_status() {
  # echoes: GOOD | OVERRULED | PENDING | MISSING  for the given cite string
  if grep -F "$1" "$REGISTRY" 2>/dev/null | grep -q "GOOD LAW"; then echo GOOD
  elif grep -F "$1" "$REGISTRY" 2>/dev/null | grep -q "OVERRULED"; then echo OVERRULED
  elif grep -qF "$1" "$REGISTRY" 2>/dev/null; then echo PENDING
  else echo MISSING; fi
}

# 3a. Case names:  "Name v. Name"
cases=$(grep -rhoE "[A-Z][A-Za-z']+ v\. [A-Z][A-Za-z']+" "${FILES[@]}" 2>/dev/null | sort -u)
while IFS= read -r cite; do
  [ -z "$cite" ] && continue
  case "$(registry_status "$cite")" in
    MISSING)   echo "  BLOCK  fabricated/unregistered case cite (not in registry): $cite"; fail=1 ;;
    PENDING)   echo "  WARN   case cite in registry but NOT yet GOOD LAW (verify before new content): $cite" ;;
    OVERRULED) : ;;  # owned by section 1 (allowed only with explicit overruled framing)
  esac
done <<< "$cases"

# 3b. Statutes:  "Act NN of YYYY"  and  "NN Pa.C.S./U.S.C./P.S. § NNN(.NN)"
stats=$(grep -rhoE "(Act [0-9]+ of [0-9]{4})|([0-9]+ (Pa\.C\.S\.|U\.S\.C\.|P\.S\.) § [0-9]+(\.[0-9]+)?)" "${FILES[@]}" 2>/dev/null | sort -u)
while IFS= read -r cite; do
  [ -z "$cite" ] && continue
  case "$(registry_status "$cite")" in
    MISSING) echo "  BLOCK  fabricated/unregistered statute cite (not in registry): $cite"; fail=1 ;;
    PENDING) echo "  WARN   statute cite in registry but NOT yet GOOD LAW (verify before new content): $cite" ;;
  esac
done <<< "$stats"

echo "---"
if [ "$fail" -ne 0 ]; then
  echo "FAIL: hard legal-citation violation(s). Do not commit until fixed."
  echo "      A BLOCK means a cite is overruled-as-current, a known conflation, or"
  echo "      not in $REGISTRY. If the cite is real, verify it against a"
  echo "      primary source (helper: _legal/verify-citation.sh) and add it as GOOD LAW."
  exit 1
fi
echo "PASS: every case & statute cite is registered; no overruled-as-current law, no known conflations."
echo "      Resolve any WARN lines above (PENDING cites) before using them in NEW content."
exit 0
