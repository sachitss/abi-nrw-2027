#!/bin/bash
# Abi-Kurse NRW 2027 - auf GitHub Pages veroeffentlichen oder aktualisieren (Mac / Linux)
# Mac: Rechtsklick -> Oeffnen (beim ersten Mal). Linux: ./INSTALLIEREN-Mac.command
cd "$(dirname "$0")" || exit 1
DEFAULT_REPO="abi-nrw-2027"

say()  { printf '\n\033[36m%s\033[0m\n' "$1"; }
ok()   { printf '  \033[32mOK\033[0m  %s\n' "$1"; }
fail() { printf '\n\033[31mFEHLER: %s\033[0m\n' "$1"; read -r -p "Enter zum Schliessen ..." _; exit 1; }

echo "=============================================="
echo " Abi-Kurse NRW 2027  ->  GitHub Pages"
echo "=============================================="

say "1/5  Werkzeuge pruefen"
if ! command -v git >/dev/null 2>&1; then
  if [ "$(uname)" = "Darwin" ]; then xcode-select --install 2>/dev/null; fi
  fail "Git fehlt. Auf dem Mac erscheint ein Fenster zur Installation der Entwicklerwerkzeuge - danach dieses Skript erneut starten. Sonst: https://git-scm.com"
fi
ok "Git gefunden"
if ! command -v gh >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then
    say "GitHub CLI wird installiert (einmalig) ..."; brew install gh
  fi
fi
command -v gh >/dev/null 2>&1 || fail "GitHub CLI fehlt. Installieren: https://cli.github.com (Mac: Paket herunterladen und oeffnen) - danach erneut starten."
ok "GitHub CLI gefunden"

say "2/5  Bei GitHub anmelden"
if ! gh auth status >/dev/null 2>&1; then
  echo "  Es oeffnet sich der Browser. Code aus diesem Fenster eingeben und GitHub bestaetigen."
  gh auth login --hostname github.com --git-protocol https --web || fail "Anmeldung bei GitHub nicht abgeschlossen."
fi
gh auth setup-git >/dev/null 2>&1
OWNER="$(gh api user --jq .login)"
[ -n "$OWNER" ] || fail "GitHub-Benutzername konnte nicht gelesen werden."
ok "angemeldet als $OWNER"

if [ -d .git ] && git remote | grep -qx origin; then
  REPO="$(gh repo view --json name --jq .name)"
  say "3/5  Vorhandenes Repository $OWNER/$REPO wird aktualisiert"
else
  say "3/5  Repository anlegen"
  read -r -p "  Name des Repositorys (Enter = $DEFAULT_REPO): " REPO
  REPO="${REPO:-$DEFAULT_REPO}"
  REPO="$(printf '%s' "$REPO" | tr -c 'A-Za-z0-9._-' '-')"
  if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
    read -r -p "  $OWNER/$REPO gibt es schon. Inhalt dorthin hochladen und ersetzen? (j/n) " A
    case "$A" in j*|J*|y*|Y*) ;; *) fail "Abgebrochen. Mit einem anderen Namen erneut starten." ;; esac
  else
    gh repo create "$OWNER/$REPO" --public --description "Abitur NRW 2027: Abi Mathe, Abi English, Abi Espanol und Abi Geographie (Erdkunde) - interaktive Lernkurse" || fail "Repository konnte nicht angelegt werden."
    ok "https://github.com/$OWNER/$REPO angelegt"
  fi
  if gh api -X POST "repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null 2>&1 \
     || gh api -X PUT "repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null 2>&1; then
    ok "GitHub Pages eingeschaltet"
  else
    echo "  Hinweis: Pages bitte einmal manuell einschalten: https://github.com/$OWNER/$REPO/settings/pages -> Source: GitHub Actions"
  fi
  git init -q
  git checkout -q -B main
  git config user.name  >/dev/null || git config user.name "$OWNER"
  git config user.email >/dev/null || git config user.email "$OWNER@users.noreply.github.com"
  git remote add origin "https://github.com/$OWNER/$REPO.git"
fi

say "4/5  Dateien hochladen"
git add -A
if ! git diff --cached --quiet; then
  git commit -q -m "Abi-Kurse 2027 - Stand $(date '+%Y-%m-%d %H:%M')"
  git push -u origin main --force-with-lease || git push -u origin main --force || fail "Hochladen fehlgeschlagen. Internetverbindung pruefen und erneut starten."
  ok "hochgeladen"
else
  ok "keine Aenderungen - nichts hochzuladen"
fi

say "5/5  Veroeffentlichung abwarten (1-3 Minuten)"
sleep 8
RUN="$(gh run list --repo "$OWNER/$REPO" --workflow pages.yml --limit 1 --json databaseId --jq '.[0].databaseId' 2>/dev/null)"
if [ -n "$RUN" ]; then
  gh run watch "$RUN" --repo "$OWNER/$REPO" --exit-status || echo "  Veroeffentlichung meldet einen Fehler: https://github.com/$OWNER/$REPO/actions"
fi

HOST="$(printf '%s' "$OWNER" | tr '[:upper:]' '[:lower:]').github.io"
if [ "$(printf '%s' "$REPO" | tr '[:upper:]' '[:lower:]')" = "$HOST" ]; then URL="https://$HOST/"; else URL="https://$HOST/$REPO/"; fi
echo
echo "=============================================="
echo " Fertig! Startseite:  $URL"
echo " Abi Mathe:           ${URL}mathe/"
echo " Abi English:         ${URL}english/"
echo " Abi Espanol:         ${URL}espanol/"
echo " Abi Geographie:      ${URL}erdkunde/"
echo " QR-Codes fuer Tablets/Handys: ${URL}mathe/install.html, ${URL}english/install.html, ${URL}espanol/install.html  und  ${URL}erdkunde/install.html"
echo "=============================================="
echo " Spaeter aktualisieren: neue Dateien in diesen Ordner kopieren und dieses Skript erneut starten."
(open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null) &
read -r -p "Enter zum Schliessen ..." _
