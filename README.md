# Abi-Kurse NRW 2027

Interaktive Vorbereitung auf das Abitur 2027 in Nordrhein-Westfalen – als Web-App, offline nutzbar und auf Handy, Tablet und Computer installierbar.

| Kurs | Ordner | Kursarten |
|---|---|---|
| **Abi Español 2027** | [`espanol/`](espanol/) | GK neu einsetzend, GK fortgeführt, LK |
| **Abi Geographie (Erdkunde) 2027** | [`erdkunde/`](erdkunde/) | GK, LK |

Nach der Veröffentlichung erreichbar unter `https://BENUTZERNAME.github.io/REPOSITORY/`.

## Veröffentlichen – drei Wege

### Weg A · Installations-Skript (empfohlen, ca. 3 Minuten)
1. Ordner entpacken.
2. **Windows:** `INSTALLIEREN-Windows.bat` doppelklicken.
   **Mac:** `INSTALLIEREN-Mac.command` mit Rechtsklick → *Öffnen*.
3. Den Anweisungen folgen: Das Skript installiert bei Bedarf Git und GitHub CLI, meldet dich im Browser bei GitHub an, legt das Repository an, schaltet GitHub Pages ein, lädt alles hoch und öffnet am Ende die fertige Seite.

**Aktualisieren:** neue Kursdateien in diesen Ordner kopieren und dasselbe Skript noch einmal starten.

### Weg B · GitHub Desktop
1. [GitHub Desktop](https://desktop.github.com) installieren und anmelden.
2. *File → Add local repository* → diesen Ordner wählen → *create a repository* → *Publish repository* (Haken bei „Keep this code private“ **entfernen**).
3. Auf github.com im Repository: *Settings → Pages → Source: GitHub Actions*.
4. Unter *Actions* warten, bis „Kurse veröffentlichen“ grün ist.

### Weg C · Nur im Browser
1. Auf github.com: *+ → New repository*, Name `abi-nrw-2027`, **Public**, *Create*.
2. *uploading an existing file* → Inhalt dieses Ordners hineinziehen → *Commit changes*.
   GitHub nimmt pro Upload höchstens 100 Dateien: zuerst die Dateien auf oberster Ebene plus `anleitungen/`, dann `espanol/`, dann `erdkunde/` in getrennten Durchgängen hochladen.
3. *Settings → Pages → Source:* **GitHub Actions**. Falls der versteckte Ordner `.github` nicht mit hochgeladen wurde (Explorer/Finder zeigen ihn oft nicht an), stattdessen **Deploy from a branch → main → / (root)** wählen.

## Hinweise
- GitHub Pages ist für **öffentliche** Repositorys kostenlos. Die Kurse speichern keine Daten auf dem Server; der Lernfortschritt bleibt im Browser des jeweiligen Geräts.
- Prüfungsvorgaben nach den amtlichen Dokumenten von Standardsicherung NRW für das Abitur 2027 (Stand September 2026). Sie gelten nicht automatisch für spätere Jahrgänge. Übungen und Probeklausuren sind eigens erstellt.
- Schriften: SIL Open Font License (Lizenztexte in `*/fonts/LIZENZEN/`).
