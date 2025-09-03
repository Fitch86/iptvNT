@echo off
npm run build:prod
powershell -Command "(Get-Content dist/browser/assets/config.json) -replace 'PLACEHOLDER_BACKEND_URL', 'http://127.0.0.1:3000' | Set-Content dist/browser/assets/config.json"
echo Build completed with local backend URL configured
pause
