@echo off
chcp 65001 > nul
title Gia Pha Dong Ho Nguyen Mau (Nganh 4) - Khoi Chay Ung Dung

echo ===============================================================================
echo        GIA PHẢ DÒNG HỌ NGUYỄN MẬU (NGÀNH 4) - CỔ LỄ, TRỰC NINH, NAM ĐỊNH
echo                        Chương Trình Khởi Chạy Tự Động
echo ===============================================================================
echo.

:: 1. Chuyển về đúng thư mục chứa file bat
cd /d "%~dp0"

:: 2. Thiết lập thông tin Supabase cấu hình sẵn
set "SUPABASE_SITE_NAME=Gia Phả Họ Nguyễn Mậu (Ngành 4)"
set "SUPABASE_PROJECT_URL=https://uwlluncglayxwumfgqbj.supabase.co"
set "SUPABASE_ANON_KEY=sb_publishable_JmQAeQDs9cu4k6kbHuva4Q_aBjn_PXF"
set "PORT=3005"

echo [1/4] Ghi nhận thông tin cấu hình Supabase:
echo       * Project URL : %SUPABASE_PROJECT_URL%
echo       * Anon Key    : %SUPABASE_ANON_KEY%
echo.

:: Tự động tạo / ghi đè file .env.local với các giá trị cấu hình trên
(
    echo # -----------------------------------------------------------------------------
    echo # GIA PHẢ DÒNG HỌ NGUYỄN MẬU (NGÀNH 4) - CẤU HÌNH SUPABASE
    echo # -----------------------------------------------------------------------------
    echo SITE_NAME="%SUPABASE_SITE_NAME%"
    echo NEXT_PUBLIC_SUPABASE_URL="%SUPABASE_PROJECT_URL%"
    echo NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="%SUPABASE_ANON_KEY%"
) > ".env.local"
echo       -> Đã đồng bộ file .env.local thành công!
echo.

:: 3. Kiểm tra Bun hoặc Node.js / NPM
set PKG_MGR=npm
where bun >nul 2>nul
if %errorlevel% equ 0 (
    set PKG_MGR=bun
    echo [2/4] Đã phát hiện Bun trên máy tính.
) else (
    where npm >nul 2>nul
    if %errorlevel% equ 0 (
        set PKG_MGR=npm
        echo [2/4] Đã phát hiện Node.js / NPM trên máy tính.
    ) else (
        echo [LỖI] Không tìm thấy Node.js hoặc Bun trên máy tính!
        echo Vui lòng cài đặt Node.js tại https://nodejs.org trước khi chạy.
        echo.
        pause
        exit /b 1
    )
)
echo.

:: 4. Kiểm tra thư viện node_modules
if not exist "node_modules\" (
    echo [3/4] Chưa cài đặt thư viện, đang tiến hành cài đặt (vui lòng đợi trong giây lát)...
    if "%PKG_MGR%"=="bun" (
        call bun install
    ) else (
        call npm install
    )
    if %errorlevel% neq 0 (
        echo [LỖI] Cài đặt thư viện thất bại. Vui lòng kiểm tra kết nối mạng!
        pause
        exit /b 1
    )
    echo       -> Cài đặt thư viện hoàn tất!
) else (
    echo [3/4] Thư viện node_modules đã được cài đặt đầy đủ.
)
echo.

:: 5. Mở trình duyệt và khởi chạy ứng dụng trên cổng 3005 (tránh xung đột cổng 3000)
echo [4/4] Đang khởi động máy chủ Gia Phả OS tại http://localhost:%PORT% ...
echo.
echo ===============================================================================
echo   Website sẽ sẵn sàng tại: http://localhost:%PORT%
echo   Để dừng máy chủ, nhấn tổ hợp phím Ctrl + C trong cửa sổ này.
echo ===============================================================================
echo.

:: Chờ 3 giây rồi tự động mở trình duyệt đúng cổng 3005
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:%PORT%"

:: Chạy server dev trên cổng 3005
if "%PKG_MGR%"=="bun" (
    call bun run dev -- -p %PORT%
) else (
    call npm run dev -- -p %PORT%
)

pause
