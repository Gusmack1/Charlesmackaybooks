@echo off
echo 🚀 Running Charles Mackay Books Deployment Script...
echo.

REM Run the PowerShell script
powershell -ExecutionPolicy Bypass -File "%~dp0deploy-and-push.ps1"

echo.
echo Press any key to exit...
pause >nul 