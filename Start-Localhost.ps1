$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$hugoPath = Join-Path $PSScriptRoot '.local-tools\hugo.exe'
if (-not (Test-Path -LiteralPath $hugoPath)) {
    New-Item -ItemType Directory -Force -Path '.local-tools' | Out-Null
    Invoke-WebRequest 'https://github.com/gohugoio/hugo/releases/download/v0.134.3/hugo_extended_0.134.3_windows-amd64.zip' -OutFile '.local-tools\hugo.zip'
    Expand-Archive -LiteralPath '.local-tools\hugo.zip' -DestinationPath '.local-tools' -Force
}
Write-Host 'Mo http://localhost:1313/ de xem bao cao. Nhan Ctrl+C de dung.'
& $hugoPath server --bind 127.0.0.1 --port 1313 --baseURL http://localhost:1313/ --appendPort=false --disableFastRender
