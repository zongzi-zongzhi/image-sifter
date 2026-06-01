@echo off
title Image Sifter
cd /d D:\GitHub\image-sifter

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js / npm was not found. Please install Node.js first.
  pause
  exit /b 1
)

if not exist node_modules\electron\dist\electron.exe (
  echo Dependencies are missing. Installing now...
  call npm install
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

call npm start
if errorlevel 1 (
  echo Image Sifter failed to start.
  pause
  exit /b 1
)
