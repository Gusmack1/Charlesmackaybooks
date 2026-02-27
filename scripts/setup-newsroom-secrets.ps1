# Add GitHub Secrets for Newsroom automation
# Run: .\scripts\setup-newsroom-secrets.ps1
# Prerequisites: gh CLI installed, gh auth login completed

$ErrorActionPreference = "Stop"

Write-Host "`n=== Newsroom GitHub Secrets Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check gh auth
$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "GitHub CLI is not authenticated. Run:" -ForegroundColor Yellow
    Write-Host "  gh auth login" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit 1
}

# SERPER_API_KEY
Write-Host "1. SERPER_API_KEY (get from https://serper.dev)" -ForegroundColor Cyan
$serper = Read-Host "   Paste your Serper API key (or press Enter to skip)"
if ($serper) {
    $serper | gh secret set SERPER_API_KEY
    Write-Host "   Added SERPER_API_KEY" -ForegroundColor Green
} else {
    Write-Host "   Skipped" -ForegroundColor Gray
}

# OPENAI_API_KEY
Write-Host ""
Write-Host "2. OPENAI_API_KEY (get from https://platform.openai.com/api-keys)" -ForegroundColor Cyan
$openai = Read-Host "   Paste your OpenAI API key (or press Enter to skip)"
if ($openai) {
    $openai | gh secret set OPENAI_API_KEY
    Write-Host "   Added OPENAI_API_KEY" -ForegroundColor Green
} else {
    Write-Host "   Skipped" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Done. Verify with: gh secret list" -ForegroundColor Green
Write-Host ""
