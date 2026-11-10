@echo off
chcp 65001 >nul
title Khởi chạy Client & Server - HCM FloodSafe
echo ======================================================================
echo   🌊 ĐANG KHỞI CHẠY TRANG CHỦ & BẢN ĐỒ NGƯỜI DÂN (CLIENT + SERVER)
echo ======================================================================
echo.

echo [1/2] Đang khởi động Backend Server (Port 5000)...
start "FloodSafe - Backend Server [Port 5000]" cmd /k "cd /d %~dp0server && pnpm run dev"

timeout /t 2 /nobreak >nul

echo [2/2] Đang khởi động Client Web App (Port 3000)...
start "FloodSafe - Client Web [Port 3000]" cmd /k "cd /d %~dp0client && pnpm run dev"

echo.
echo 🚀 Đang mở trình duyệt tới http://localhost:3000...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo ======================================================================
echo   ✅ Hoàn tất! Bạn có thể xem trang web tại: http://localhost:3000
echo ======================================================================
pause

