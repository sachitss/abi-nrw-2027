@echo off
title Abi-Kurse NRW 2027 - GitHub Pages
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0installieren.ps1"
echo.
pause
