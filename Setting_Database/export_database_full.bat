@echo off
setlocal enabledelayedexpansion

REM ==============================
REM SETTING MYSQL EXPORT
REM ==============================
set MYSQLDUMP_PATH=C:\xampp\mysql\bin\mysqldump.exe

set DB_HOST=192.168.137.131
set DB_PORT=3306
set DB_USER=otics_tps
set DB_PASS=sukatno_ali
set DB_NAME=database_tps_master

REM Tujuan penyimpanan hasil export
set OUTPUT_DIR=D:\on\Project_Server\Database

REM Buat folder jika belum ada
if not exist "%OUTPUT_DIR%" (
    mkdir "%OUTPUT_DIR%"
)

REM Ambil tanggal dan jam
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set DATETIME=%%i

set OUTPUT_FILE=%OUTPUT_DIR%\%DB_NAME%_%DATETIME%.sql

echo =====================================
echo EXPORT DATABASE MYSQL
echo Host     : %DB_HOST%
echo Port     : %DB_PORT%
echo Database : %DB_NAME%
echo Output   : %OUTPUT_FILE%
echo =====================================
echo.

REM Cek mysqldump.exe
if not exist "%MYSQLDUMP_PATH%" (
    echo ERROR: mysqldump.exe tidak ditemukan di:
    echo %MYSQLDUMP_PATH%
    pause
    exit /b
)

REM Export database
"%MYSQLDUMP_PATH%" ^
--host=%DB_HOST% ^
--port=%DB_PORT% ^
--user=%DB_USER% ^
--password=%DB_PASS% ^
--single-transaction ^
--routines ^
--triggers ^
--events ^
%DB_NAME% > "%OUTPUT_FILE%"

if errorlevel 1 (
    echo.
    echo GAGAL export database.
    echo Cek host, port, username, password, nama database, atau koneksi MySQL.
    pause
    exit /b
) else (
    echo.
    echo BERHASIL export database.
    echo File tersimpan di:
    echo %OUTPUT_FILE%
)

pause
