#!/bin/bash

# ===================================
# SCRIPT MIGRASI DATABASE MYSQL
# Dari host lama ke host baru
# ===================================

# Konfigurasi Sumber
SOURCE_HOST="169.254.33.125"
SOURCE_USER="otics_tps"
SOURCE_PASS="sukatno_ali"
SOURCE_DB="database_tps_energy"

# Konfigurasi Tujuan
DEST_HOST="localhost"
DEST_USER="otics_tps"
DEST_PASS="sukatno_ali"
DEST_DB="database_tps_energy"

# Nama file dump sementara
DUMP_FILE="/tmp/db_migration.sql.gz"

# Waktu eksekusi
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "[$TIMESTAMP] Mulai proses migrasi database..."

# 1. Dump dari database sumber + kompresi gzip langsung
echo "Dump dari sumber: $SOURCE_HOST..."
mysqldump -h "$SOURCE_HOST" -u "$SOURCE_USER" -p"$SOURCE_PASS" "$SOURCE_DB" | gzip > "$DUMP_FILE"

if [ $? -ne 0 ]; then
    echo "[ERROR] Gagal dump dari database sumber."
    exit 1
fi

echo "Dump berhasil, disimpan sementara di $DUMP_FILE"

# 2. Hapus semua data di tujuan (opsional: jika ingin replace)
echo "Menghapus data lama di database tujuan ($DEST_HOST)..."
mysql -h "$DEST_HOST" -u "$DEST_USER" -p"$DEST_PASS" -e "SET FOREIGN_KEY_CHECKS=0; DROP DATABASE IF EXISTS \`$DEST_DB\`; CREATE DATABASE \`$DEST_DB\`; SET FOREIGN_KEY_CHECKS=1;"

if [ $? -ne 0 ]; then
    echo "[ERROR] Gagal reset database tujuan."
    exit 1
fi

echo "Database tujuan telah dibersihkan dan dibuat ulang."

# 3. Impor data ke database tujuan
echo "Mengimpor data ke tujuan: $DEST_HOST..."
gunzip < "$DUMP_FILE" | mysql -h "$DEST_HOST" -u "$DEST_USER" -p"$DEST_PASS" "$DEST_DB"

if [ $? -ne 0 ]; then
    echo "[ERROR] Gagal mengimpor ke database tujuan."
    exit 1
fi

# 4. Hapus file sementara
rm -f "$DUMP_FILE"

# Selesai
END_TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "[$END_TIMESTAMP] Migrasi database BERHASIL!"
echo "Database dari $SOURCE_HOST telah dipindahkan ke $DEST_HOST"
