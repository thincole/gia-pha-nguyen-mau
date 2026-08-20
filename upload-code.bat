@echo off
chcp 65001 > nul
title Day Ma Nguon Len GitHub - Gia Pha Nguyen Mau

echo ===============================================================================
echo        TU DONG DAY MA NGUON GIA PHA NGUYEN MAU LEN GITHUB
echo                  Repository: thincole/gia-pha-nguyen-mau
echo ===============================================================================
echo.

:: 1. Chuyen ve thu muc goc cua du an
cd /d "%~dp0"

:: 2. Kiem tra Git
where git >nul 2>nul
if errorlevel 1 (
    echo [LOI] Khong tim thay Git tren may tinh!
    echo Vui long cai dat Git tai https://git-scm.com/download/win
    pause
    exit /b 1
)

:: 3. Thiet lap thong so
set REPO_URL=https://github.com/thincole/gia-pha-nguyen-mau.git
set COMMIT_MSG=Khoi tao Gia Pha Ho Nguyen Mau Nganh 4

echo [1/5] Khoi tao va cau hinh danh tinh Git...
if not exist ".git" git init

:: Tu dong cau hinh ten va email neu chua co
git config user.name >nul 2>nul
if errorlevel 1 git config user.name "thincole"

git config user.email >nul 2>nul
if errorlevel 1 git config user.email "thincole@users.noreply.github.com"

echo [2/5] Cau hinh Remote Origin sang: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [3/5] Chuyen ve nhanh main va them toan bo file...
git branch -M main
git add .

echo [4/5] Tao Commit...
git commit -m "%COMMIT_MSG%"

echo [5/5] Dang day ma nguon len GitHub...
echo.
git push -u origin main

if errorlevel 1 goto :FAILED
goto :SUCCESS

:FAILED
echo.
echo ===============================================================================
echo   [CHUA THANH CONG] Hay kiem tra 2 dieu sau:
echo   1. Tao repository 'gia-pha-nguyen-mau' tren GitHub tai: https://github.com/new
echo   2. Dang nhap tai khoan GitHub khi trinh duyet yeu cau xac thuc.
echo ===============================================================================
goto :END

:SUCCESS
echo.
echo ===============================================================================
echo   [THANH CONG] DA DAY TOAN BO MA NGUON LEN GITHUB!
echo   Xem du an tai: https://github.com/thincole/gia-pha-nguyen-mau
echo ===============================================================================

:END
echo.
pause
