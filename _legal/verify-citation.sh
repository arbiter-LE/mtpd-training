#!/usr/bin/env bash
# Arbiter LE — citation existence verifier (on-demand assist for the registry)
#
# WHAT THIS IS: a sanity check you run *before* hand-adding a case to
# _legal/citations-registry.md. It asks a real legal database (CourtListener,
# by the Free Law Project) whether the case actually exists. It is the automated
# answer to "is this a real case or did an AI invent it?" — the #1 hallucination
# in the Charlotin court-sanctions database.
#
# WHAT THIS IS NOT: it does not verify a HOLDING (read the opinion for that) and
# it does not cover statutes (CourtListener is case law only — verify PA statutes
# against legis.state.pa.us / pacodeandbulletin.gov by hand). It is an assist, not
# the gate. The deterministic wall is _legal/check-citations.sh.
#
# Usage:
#   _legal/verify-citation.sh "Graham v. Connor"
#   _legal/verify-citation.sh "Graham v. Connor" "490 U.S. 386"
#
# Optional: export COURTLISTENER_TOKEN=... for higher rate limits (free account at
#   courtlistener.com → Profile → API). Works anonymously without it, just slower.
#
# Exit 0 = at least one matching opinion found. Exit 1 = none found (suspicious —
# do NOT add to the registry until you confirm it by hand). Exit 2 = lookup error.

set -uo pipefail

NAME="${1:-}"
CITE="${2:-}"
if [ -z "$NAME" ]; then
  echo "usage: $0 \"Case v. Name\" [\"123 U.S. 456\"]" >&2
  exit 2
fi

command -v curl >/dev/null 2>&1 || { echo "curl not found" >&2; exit 2; }
PY=""
for c in python3 python; do command -v "$c" >/dev/null 2>&1 && { PY="$c"; break; }; done
[ -z "$PY" ] && { echo "python3 not found (needed to parse the JSON response)" >&2; exit 2; }

API="https://www.courtlistener.com/api/rest/v4/search/"
# Query on the case name; CourtListener relevance-ranks. If a reporter cite was
# given we pass it too so the right volume/page surfaces near the top.
Q="$NAME"
[ -n "$CITE" ] && Q="$NAME $CITE"

AUTH=()
[ -n "${COURTLISTENER_TOKEN:-}" ] && AUTH=(-H "Authorization: Token ${COURTLISTENER_TOKEN}")

echo "Querying CourtListener for: $NAME${CITE:+  ($CITE)}"
RESP=$(curl -fsS --get "$API" \
  --data-urlencode "type=o" \
  --data-urlencode "q=$Q" \
  ${AUTH[@]+"${AUTH[@]}"} \
  -A "ArbiterLE-citation-check" 2>/dev/null) || {
    echo "  ERROR: could not reach CourtListener (network/rate-limit). Verify by hand." >&2
    exit 2
  }

# Parse: print top matches; decide found/not-found. If a reporter cite was supplied,
# require it to appear in a result's citation list for a confident match.
# (Parser lives in a temp file so the JSON can be piped in on stdin — `python -`
#  would read its program from stdin and collide with the data.)
TMP_PY=$(mktemp "${TMPDIR:-/tmp}/arbiter-cite.XXXXXX.py") || { echo "  ERROR: mktemp failed" >&2; exit 2; }
trap 'rm -f "$TMP_PY"' EXIT
cat > "$TMP_PY" <<'PYEOF'
import json, sys, re
try:
    data = json.loads(sys.stdin.read())
except Exception as e:
    print("  ERROR: unparseable response (%s). Verify by hand." % e); sys.exit(2)

name = sys.argv[1]
want_cite = (sys.argv[2] or "").strip()
results = data.get("results") or []
if not results:
    print("  NOT FOUND: no opinion matched. Treat as suspicious — do NOT add to the")
    print("             registry until you confirm it exists against a primary source.")
    sys.exit(1)

def norm(s): return re.sub(r"\s+", " ", (s or "")).strip()

top = results[:5]
print("  Top matches:")
cite_hit = False
for r in top:
    cn = norm(r.get("caseName") or r.get("caseNameFull"))
    cites = r.get("citation") or []
    if isinstance(cites, str): cites = [cites]
    url = r.get("absolute_url") or ""
    print("    - %s  [%s]" % (cn, "; ".join(cites) if cites else "no reporter cite"))
    if url:
        print("      https://www.courtlistener.com%s" % url)
    if want_cite and any(want_cite.replace(" ", "") in norm(c).replace(" ", "") for c in cites):
        cite_hit = True

if want_cite and not cite_hit:
    print("  PARTIAL: a case by that name exists, but the reporter cite '%s' did not" % want_cite)
    print("           appear in the top results. Confirm the exact citation by hand")
    print("           before recording it as GOOD LAW.")
    sys.exit(1)

print("  FOUND: this case exists in CourtListener. (Existence only — read the opinion")
print("         to verify the HOLDING before recording it as GOOD LAW.)")
sys.exit(0)
PYEOF

printf '%s' "$RESP" | "$PY" "$TMP_PY" "$NAME" "$CITE"
exit $?
