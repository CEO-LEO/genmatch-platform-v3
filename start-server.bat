@echo off
echo Starting Socket.IO server from GenMatch root directory...
cd /d "%~dp0\elderly-student-platform"
echo Changed to directory: %CD%
echo Starting server...
node server.js
pause
