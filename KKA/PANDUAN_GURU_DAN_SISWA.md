# 📘 Panduan Penggunaan Aplikasi KodingTSM - SMKN 1 Pleret

Aplikasi web interaktif pembelajaran dan latihan koding **Python Dasar** khusus siswa **SMK Kelas X Jurusan Teknik Sepeda Motor (TSM) SMKN 1 Pleret**, dilengkapi dengan sistem pengiriman otomatis hasil latihan ke **Google Spreadsheet** untuk penilaian guru pengampu.

---

## 🌟 Keunggulan Aplikasi untuk Jurusan TSM

1. **Konteks Otomotif Nyata**: Semua materi dan soal latihan menggunakan studi kasus bengkel motor (perhitungan CC silinder bore x stroke, diagnosa voltase aki, indikator ganti oli, siklus 4-tak, dan kalkulator nota servis).
2. **In-Browser Python Engine**: Siswa dapat langsung mengetik dan menjalankan kode Python secara instan di browser tanpa perlu instalasi Python, VS Code, compiler, atau server tambahan.
3. **Mendukung Mode Offline Lab**: Dilengkapi file engine Python lokal (`js/vendor/skulpt.min.js`), sehingga latihan koding tetap bisa berjalan lancar di Lab Komputer sekolah sekalipun koneksi internet sedang lambat.
4. **Penilaian Otomatis & Terintegrasi**: Setiap tugas dilengkapi unit test otomatis (Skor 100) dan tombol pengiriman ke Google Sheet Guru dengan satu kali klik.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dibuat murni menggunakan teknologi web modern (**HTML5, Tailwind CSS, JavaScript & Skulpt Python Engine**).

1. Buka folder `c:\Users\Zio\Downloads\Latihan koding`.
2. Klik dua kali (*double click*) pada file **`index.html`**.
3. Aplikasi akan langsung terbuka di browser Anda (Google Chrome, Microsoft Edge, atau Mozilla Firefox).
4. Dapat dijalankan di komputer Lab Sekolah, laptop guru, maupun smartphone siswa.

---

## 👨‍🏫 Panduan Guru: Menghubungkan Google Spreadsheet (5 Menit)

Agar hasil latihan dan kode Python siswa otomatis tersimpan rapi di Google Sheet Anda, ikuti langkah mudah berikut:

### Langkah 1: Buat Google Spreadsheet Baru
1. Buka browser dan kunjungi [Google Sheets](https://sheets.new).
2. Beri nama file, misalnya: **"Rekap Nilai Koding X TSM - SMKN 1 Pleret"**.

### Langkah 2: Pasang Google Apps Script
1. Pada menu atas Spreadsheet, klik menu **Ekstensi** (*Extensions*) &rarr; pilih **Apps Script**.
2. Hapus semua teks contoh yang ada di jendela editor kode.
3. Buka file `GoogleAppsScript.gs` yang ada di folder aplikasi ini (atau klik tombol hijau **"Salin Kode Apps Script"** pada dialog Pengaturan Guru di web).
4. Tempelkan (*paste*) kodenya ke editor Apps Script.
5. Klik ikon disket **Simpan** (*Save*) di bagian atas.

### Langkah 3: Deploy sebagai Web App
1. Klik tombol biru **Terapkan** (*Deploy*) di pojok kanan atas &rarr; pilih **Penerapan baru** (*New deployment*).
2. Pada bagian *Pilih jenis* (ikon gerigi), pilih **Aplikasi web** (*Web app*).
3. Atur konfigurasi berikut:
   - **Deskripsi**: `Penerima Nilai Koding Siswa TSM`
   - **Jalankan sebagai (*Execute as*)**: `Saya (email akun Google Anda)`
   - **Siapa yang memiliki akses (*Who has access*)**: **`Siapa saja (Anyone)`** *(Sangat penting agar browser siswa dapat mengirim data)*.
4. Klik tombol **Terapkan** (*Deploy*).
5. Jika muncul jendela otorisasi akun:
   - Klik **Beri Akses** (*Authorize access*).
   - Pilih akun Google Anda.
   - Klik teks kecil di kiri bawah **Lanjutan** (*Advanced*) &rarr; klik **Buka Penerima Nilai (tidak aman)** (*Go to unsafe*).
   - Klik **Izinkan** (*Allow*).
6. Salin **URL Aplikasi Web** yang berakhiran `/exec`.

### Langkah 4: Masukkan URL ke Aplikasi
Ada 2 pilihan cara memasukkan URL:
- **Cara A (Langsung lewat Web):**
  Klik ikon **Pengaturan (Gerigi)** di pojok kanan atas aplikasi web &rarr; Tempelkan URL &rarr; Klik tombol **"Tes Sambungan ke Sheet"** untuk memastikan koneksi aktif &rarr; Klik **"Simpan URL"**.
- **Cara B (Permanen untuk Seluruh Komputer Lab TSM):**
  Buka file `js/config.js` dengan Notepad, lalu tempelkan URL pada baris:
  ```javascript
  defaultGoogleScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
  ```
  Dengan cara ini, seluruh komputer lab yang membuka file `index.html` otomatis terhubung ke Sheet Anda tanpa perlu siswa mengatur URL lagi!

---

## 📊 Format Data Rekapan di Google Sheet Guru

Setiap siswa mengklik tombol **"Kirim Nilai ke Sheet Guru"**, Google Sheet Anda akan otomatis menambahkan baris baru dengan format kolom:

| Kolom | Keterangan Data |
| :--- | :--- |
| **Waktu Pengiriman** | Tanggal dan jam pengiriman (WIB) |
| **Nama Lengkap Siswa** | Nama lengkap mekanik siswa |
| **Kelas** | Kelas (misal: X TSM 1, X TSM 2, X TSM 3) |
| **No. Absen** | Nomor presensi siswa |
| **NISN** | Nomor Induk Siswa Nasional / NIS |
| **ID Latihan** | Nomor kode tugas (Latihan 01 s/d 07) |
| **Judul Latihan Koding** | Nama tantangan latihan yang dikerjakan |
| **Status Uji** | `Lolos Uji` (Warna Hijau) atau `Terkirim (Perlu Review)` (Warna Merah) |
| **Nilai Skor** | Skor otomatis (100 jika lolos uji) |
| **Kode Python Siswa** | Seluruh baris sintaks kode Python yang ditulis siswa |
| **Output Terminal** | Teks keluaran simulator terminal hasil eksekusi kode |

---

## 👩‍🎓 Panduan Siswa: Cara Belajar & Mengumpulkan Latihan

1. **Lengkapi Identitas Diri**:
   - Klik tombol **"Isi Profil Siswa"** di navbar atas.
   - Masukkan Nama Lengkap, pilih Kelas (**X TSM 1**, **X TSM 2**, dll.), dan Nomor Absen.
2. **Pelajari Materi TSM**:
   - Klik tab **"Materi TSM"** di panel samping kiri.
   - Pilih modul materi (Pengenalan print(), Variabel Otomotif, Rumus CC Silinder, Percabangan if-elif-else, Perulangan Siklus 4-Tak, Fungsi Nota Servis).
   - Baca teori & analogi bengkel motor, lalu coba jalankan contoh kodenya di kotak interaktif.
3. **Buka Kamus Python TSM**:
   - Jika lupa perintah, klik tombol **"Kamus Python"** di navbar untuk melihat panduan cepat sintaks Python.
4. **Kerjakan Latihan Koding**:
   - Klik tab **"Latihan Koding"**.
   - Pilih salah satu dari 7 tantangan latihan.
   - Baca deskripsi studi kasus motor dan ikuti **Petunjuk Pengerjaan**.
   - Tulis kode program Python kamu di editor tengah.
5. **Jalankan & Uji Jawaban**:
   - Klik **"Jalankan Python"** (atau tekan **Ctrl + Enter**) untuk melihat output di Terminal ECU simulator.
   - Klik **"Uji Jawaban"** untuk mengecek kesesuaian kode dengan kriteria penilaian.
6. **Kirim Nilai ke Guru**:
   - Setelah muncul kotak hijau bertuliskan *"Selamat! Jawaban Koding Lolos Pengujian (Skor: 100/100)"*, klik tombol **"Kirim Nilai ke Sheet Guru"**.
   - Muncul jendela konfirmasi bahwa nilai berhasil terkirim.
   - Siswa dapat mengecek daftar tugas yang sudah diserahkan melalui ikon dokumen di navbar.

---

## 🛠️ Daftar Modul & Latihan Koding TSM

1. **Modul & Latihan 01: Dasar & Output (`print`)**
   - Menampilkan Kartu Pengenal Mekanik Siswa TSM SMKN 1 Pleret.
2. **Modul & Latihan 02: Variabel & Tipe Data Otomotif**
   - Mengelola data spesifikasi motor masuk (String, Integer, Float, Boolean).
3. **Modul & Latihan 03: Operator Matematika & Kapasitas Mesin**
   - Menghitung kapasitas volume langkah silinder mesin motor (Bore x Stroke).
4. **Modul & Latihan 04: Percabangan (`if - else`)**
   - Sistem pengingat jadwal ganti oli mesin berkala berdasarkan odometer.
5. **Modul & Latihan 05: Percabangan Bertingkat (`if - elif - else`)**
   - Diagnosa kesehatan aki motor (Normal, Lemah, Drop/Soak) hasil pembacaan multitester.
6. **Modul & Latihan 06: Perulangan (`for` loop)**
   - Pengecekan 4 langkah kerja siklus pembakaran mesin 4-tak (Hisap, Kompresi, Usaha, Buang).
7. **Modul & Latihan 07: Fungsi Modular (`def` & `return`)**
   - Fungsi kalkulator penghitung nota total biaya servis dan sparepart bengkel motor.

---

## 💡 Tips & Troubleshooting

- **Muncul Error Indentasi (*IndentationError*)?**
  Bahasa Python mengharuskan baris di dalam `if`, `elif`, `else`, `for`, atau `def` menjorok ke dalam sebanyak 4 spasi. Gunakan tombol **Tab** pada keyboard untuk membuat indentasi secara otomatis.
- **Koneksi Internet Lab Terputus Saat Mengirim Tugas?**
  Siswa dapat mengklik ikon Riwayat Tugas lalu memilih tombol **"Unduh Rekap CSV (Cadangan Offline Lab)"**. File tersebut dapat dikumpulkan ke guru lewat flashdisk atau Google Drive saat koneksi kembali normal.
- **URL Google Sheet Guru Berubah?**
  Cukup buka menu Pengaturan Guru (ikon gerigi) di pojok kanan atas, masukkan URL baru, lalu klik "Simpan URL".
