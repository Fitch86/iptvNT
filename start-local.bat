@echo off
echo Starting iptvNT local server...
echo.
echo Available on:
echo   http://127.0.0.1:8080
echo   http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.
http-server dist/browser --port 8080 --cors
