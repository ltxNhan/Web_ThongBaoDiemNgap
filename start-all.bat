@echo off
chcp 65001 >nul
title Khởi chạy Hệ thống Cảnh báo Ngập lụt Đô thị (HCM FloodSafe)
echo ======================================================================
echo   🌊 ĐANG KHỞI CHẠY HỆ THỐNG CẢNH BÁO NGẬP LỤT ĐÔ THỊ THÔNG MINH
echo   🏙️ Đề tài: HCM FloodSafe - TP. Hồ Chí Minh
echo ======================================================================
echo.

echo [1/3] Đang khởi động Backend API Server (Port 5000)...
start "FloodSafe - Backend Server [Port 5000]" cmd /k "cd /d %~dp0server && pnpm run dev"

timeout /t 2 /nobreak >nul

echo [2/3] Đang khởi động Admin Dashboard Portal (Port 3001)...
start "FloodSafe - Admin Portal [Port 3001]" cmd /k "cd /d %~dp0admin && pnpm run dev"

timeout /t 2 /nobreak >nul

echo [3/3] Đang khởi động Client Web App & Landing Page (Port 3000)...
start "FloodSafe - Client Web [Port 3000]" cmd /k "cd /d %~dp0client && pnpm run dev"

echo.
echo 🚀 Đang tự động mở trình duyệt tới trang chủ...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ======================================================================
echo   ✅ HỆ THỐNG ĐÃ ĐƯỢC KHỞI CHẠY HOÀN TẤT!
echo   👉 Cổng thông tin người dân (Client): http://localhost:3000
echo   👉 Bảng điều hành giám sát (Admin):  http://localhost:3001
echo   👉 Máy chủ xử lý GIS & API (Server):  http://localhost:5000
echo ======================================================================
pause

