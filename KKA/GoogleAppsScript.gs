/**
 * ==============================================================================
 * KODING TSM SMKN 1 PLERET - GOOGLE APPS SCRIPT PENERIMA TUGAS
 * ==============================================================================
 * Script ini menerima kiriman hasil latihan koding Python siswa SMK Kelas X TSM
 * dan mencatatnya secara otomatis ke dalam Google Spreadsheet guru.
 * 
 * CARA MEMASANG DI GOOGLE SPREADSHEET GURU:
 * 1. Buka https://sheets.new di browser untuk membuat spreadsheet baru.
 * 2. Beri nama file, misalnya: "Rekap Nilai Koding X TSM - SMKN 1 Pleret".
 * 3. Klik menu "Ekstensi" (Extensions) -> "Apps Script".
 * 4. Hapus semua teks yang ada di jendela editor kode, lalu tempelkan seluruh kode ini.
 * 5. Beri nama proyek, misalnya: "Penerima Nilai Koding TSM".
 * 6. Klik ikon disket "Simpan" (Save).
 * 7. Klik tombol biru "Terapkan" (Deploy) di pojok kanan atas -> pilih "Penerapan baru" (New deployment).
 * 8. Pada ikon gerigi (Select type), pilih "Aplikasi Web" (Web app).
 * 9. Konfigurasi penting:
 *    - Deskripsi : Penerima Nilai Koding Siswa TSM
 *    - Jalankan sebagai (Execute as) : Saya (email akun Google Anda)
 *    - Siapa yang memiliki akses (Who has access) : Siapa saja (Anyone) -> PENTING!
 * 10. Klik "Terapkan" (Deploy).
 * 11. Jika muncul perizinan Google:
 *     - Klik "Beri Akses" (Authorize access)
 *     - Pilih akun email guru Anda
 *     - Klik tulisan abu-abu "Lanjutan" (Advanced) di kiri bawah
 *     - Klik "Buka Penerima Nilai (tidak aman)" / "Go to ... (unsafe)"
 *     - Klik "Izinkan" (Allow).
 * 12. Salin "URL Aplikasi Web" (Web App URL) yang berakhiran `/exec`.
 * 13. Masukkan URL tersebut ke aplikasi web siswa (melalui ikon gerigi Pengaturan Guru atau di file js/config.js).
 * ==============================================================================
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Beri nama tab sheet yang representatif
    if (sheet.getName() === "Sheet1" || sheet.getName() === "Halaman1") {
      sheet.setName("Rekap_Nilai_TSM");
    }

    // Jika spreadsheet masih kosong baru dibuat, pasang Header kolom otomatis
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Waktu Pengiriman (WIB)",
        "Nama Lengkap Siswa",
        "Kelas",
        "No. Absen",
        "NISN",
        "ID Latihan",
        "Judul Latihan Koding",
        "Status Uji",
        "Nilai Skor",
        "Kode Python Siswa",
        "Output Terminal Python"
      ];
      sheet.appendRow(headers);
      
      // Percantik tampilan header tabel
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0f172a"); // Dark slate background
      headerRange.setFontColor("#f8fafc"); // White text
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 35);
      sheet.setFrozenRows(1);
    }

    // Ekstraksi data payload yang dikirim dari web browser
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, "GMT+7", "dd/MM/yyyy HH:mm:ss");

    var row = [
      formattedDate,
      data.namaSiswa || "-",
      data.kelas || "-",
      data.noAbsen || "-",
      data.nisn || "-",
      data.latihanId || "-",
      data.latihanJudul || "-",
      data.status || "Selesai",
      data.skor !== undefined ? data.skor : 100,
      data.kodeSiswa || "",
      data.outputLog || ""
    ];

    sheet.appendRow(row);

    // Pewarnaan status uji otomatis
    var lastRow = sheet.getLastRow();
    var statusRange = sheet.getRange(lastRow, 8); // Kolom Status Uji
    if (data.status === "Lolos Uji" || data.status === "Koneksi Berhasil") {
      statusRange.setBackground("#dcfce7"); // Hijau muda
      statusRange.setFontColor("#15803d"); // Teks hijau tua
      statusRange.setFontWeight("bold");
    } else {
      statusRange.setBackground("#fee2e2"); // Merah muda
      statusRange.setFontColor("#b91c1c"); // Teks merah tua
      statusRange.setFontWeight("bold");
    }

    // Format nilai skor rata tengah
    var scoreRange = sheet.getRange(lastRow, 9);
    scoreRange.setHorizontalAlignment("center");
    scoreRange.setFontWeight("bold");

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data latihan koding TSM SMKN 1 Pleret berhasil disimpan ke Google Sheet!",
      waktu: formattedDate,
      siswa: data.namaSiswa,
      latihan: data.latihanJudul
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Gagal mencatat data ke spreadsheet: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Endpoint GET untuk mengecek ketersediaan webhook service
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    school: "SMKN 1 Pleret",
    department: "Teknik Sepeda Motor (TSM)",
    service: "Layanan Penerima Tugas Koding Python Kelas X Aktif",
    serverTime: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
