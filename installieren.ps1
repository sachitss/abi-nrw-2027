# Abi-Kurse NRW 2027 - auf GitHub Pages veroeffentlichen oder aktualisieren (Windows)
# Start: INSTALLIEREN-Windows.bat doppelklicken.

$ErrorActionPreference = 'Continue'
Set-Location -LiteralPath $PSScriptRoot
$DefaultRepo = 'abi-nrw-2027'

function Say([string]$t)  { Write-Host "`n$t" -ForegroundColor Cyan }
function Ok([string]$t)   { Write-Host "  OK  $t" -ForegroundColor Green }
function Fail([string]$t) { Write-Host "`nFEHLER: $t" -ForegroundColor Red; exit 1 }

function Refresh-Path {
  $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')
}

function Need([string]$cmd, [string]$wingetId, [string]$label, [string]$url) {
  if (Get-Command $cmd -ErrorAction SilentlyContinue) { Ok "$label gefunden"; return }
  if (Get-Command winget -ErrorAction SilentlyContinue) {
    Say "$label wird installiert (einmalig) ..."
    winget install --id $wingetId -e --source winget --accept-package-agreements --accept-source-agreements
    Refresh-Path
  }
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    Fail "$label fehlt. Bitte installieren: $url - danach dieses Skript erneut starten."
  }
  Ok "$label installiert"
}

Write-Host '==============================================' -ForegroundColor Cyan
Write-Host ' Abi-Kurse NRW 2027  ->  GitHub Pages'          -ForegroundColor Cyan
Write-Host '==============================================' -ForegroundColor Cyan

Say '1/5  Werkzeuge pruefen'
Need 'git' 'Git.Git' 'Git' 'https://git-scm.com/download/win'
Need 'gh' 'GitHub.cli' 'GitHub CLI' 'https://cli.github.com'

Say '2/5  Bei GitHub anmelden'
gh auth status 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host '  Es oeffnet sich der Browser. Code aus diesem Fenster eingeben und GitHub bestaetigen.'
  gh auth login --hostname github.com --git-protocol https --web
  if ($LASTEXITCODE -ne 0) { Fail 'Anmeldung bei GitHub nicht abgeschlossen.' }
}
gh auth setup-git 2>$null | Out-Null
$owner = (gh api user --jq .login).Trim()
if (-not $owner) { Fail 'GitHub-Benutzername konnte nicht gelesen werden.' }
Ok "angemeldet als $owner"

$update = (Test-Path -LiteralPath '.git') -and ((git remote 2>$null) -contains 'origin')
if ($update) {
  $repo = (gh repo view --json name --jq .name).Trim()
  Say "3/5  Vorhandenes Repository $owner/$repo wird aktualisiert"
} else {
  Say '3/5  Repository anlegen'
  $repo = Read-Host "  Name des Repositorys (Enter = $DefaultRepo)"
  if ([string]::IsNullOrWhiteSpace($repo)) { $repo = $DefaultRepo }
  $repo = ($repo.Trim() -replace '[^A-Za-z0-9._-]', '-')
  gh repo view "$owner/$repo" 2>$null | Out-Null
  if ($LASTEXITCODE -eq 0) {
    $a = Read-Host "  $owner/$repo gibt es schon. Inhalt dorthin hochladen und ersetzen? (j/n)"
    if ($a -notmatch '^[jJyY]') { Fail 'Abgebrochen. Mit einem anderen Namen erneut starten.' }
  } else {
    gh repo create "$owner/$repo" --public --description 'Abitur NRW 2027: Abi Espanol und Abi Geographie (Erdkunde) - interaktive Lernkurse'
    if ($LASTEXITCODE -ne 0) { Fail 'Repository konnte nicht angelegt werden.' }
    Ok "https://github.com/$owner/$repo angelegt"
  }
  # GitHub Pages mit GitHub Actions einschalten
  gh api -X POST "repos/$owner/$repo/pages" -f build_type=workflow 2>$null | Out-Null
  if ($LASTEXITCODE -ne 0) { gh api -X PUT "repos/$owner/$repo/pages" -f build_type=workflow 2>$null | Out-Null }
  if ($LASTEXITCODE -eq 0) { Ok 'GitHub Pages eingeschaltet' }
  else { Write-Host "  Hinweis: Pages bitte einmal manuell einschalten: https://github.com/$owner/$repo/settings/pages -> Source: GitHub Actions" -ForegroundColor Yellow }

  git init -q
  git checkout -q -B main
  if (-not (git config user.name))  { git config user.name $owner }
  if (-not (git config user.email)) { git config user.email "$owner@users.noreply.github.com" }
  git remote add origin "https://github.com/$owner/$repo.git"
}

Say '4/5  Dateien hochladen'
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -q -m ("Abi-Kurse 2027 - Stand " + (Get-Date -Format 'yyyy-MM-dd HH:mm'))
  git push -u origin main --force-with-lease
  if ($LASTEXITCODE -ne 0) { git push -u origin main --force }
  if ($LASTEXITCODE -ne 0) { Fail 'Hochladen fehlgeschlagen. Internetverbindung pruefen und erneut starten.' }
  Ok 'hochgeladen'
} else {
  Ok 'keine Aenderungen - nichts hochzuladen'
}

Say '5/5  Veroeffentlichung abwarten (1-3 Minuten)'
Start-Sleep -Seconds 8
$run = (gh run list --repo "$owner/$repo" --workflow pages.yml --limit 1 --json databaseId --jq '.[0].databaseId' 2>$null)
if ($run) {
  gh run watch $run.Trim() --repo "$owner/$repo" --exit-status
  if ($LASTEXITCODE -ne 0) { Write-Host "  Veroeffentlichung meldet einen Fehler: https://github.com/$owner/$repo/actions" -ForegroundColor Yellow }
}

$host_ = $owner.ToLower() + '.github.io'
if ($repo.ToLower() -eq $host_) { $url = "https://$host_/" } else { $url = "https://$host_/$repo/" }
Write-Host ''
Write-Host '==============================================' -ForegroundColor Green
Write-Host " Fertig! Startseite:  $url"                     -ForegroundColor Green
Write-Host " Abi Espanol:         ${url}espanol/"
Write-Host " Abi Geographie:      ${url}erdkunde/"
Write-Host " QR-Codes fuer Tablets/Handys: ${url}espanol/install.html  und  ${url}erdkunde/install.html"
Write-Host '==============================================' -ForegroundColor Green
Write-Host ' Spaeter aktualisieren: neue Dateien in diesen Ordner kopieren und dieses Skript erneut starten.'
Start-Process $url
