/**
 * Data Materi dan Latihan Koding Python Dasar Siswa SMK Kelas X
 * Jurusan: Teknik Sepeda Motor (TSM) - SMKN 1 Pleret
 * Konteks: Logika Pemrograman & Studi Kasus Otomotif Sepeda Motor
 */

const DATA_MATERI = [
  {
    id: "materi-1",
    nomor: "01",
    kategori: "Dasar & Output",
    judul: "Pengenalan Python & Perintah print() di Bengkel TSM",
    deskripsi: "Mengenal peran koding di era motor injeksi (ECU/FI) dan cara mencetak data ke konsol menggunakan perintah print().",
    isi: `
      <h3>Mengapa Mekanik Sepeda Motor Modern Perlu Belajar Koding?</h3>
      <p>Sepeda motor zaman sekarang bukan lagi murni sistem mekanis karburator! Motor modern dilengkapi sistem <strong>Electronic Fuel Injection (EFI/PGM-FI)</strong> dan <strong>ECU (Engine Control Unit)</strong> yang merupakan komputer mini pengatur semprotan bensin, pengapian busi, hingga diagnosa kerusakan (MIL/OBD).</p>
      
      <div class="note-box">
        <strong>🔧 Analogi Mekanik TSM SMKN 1 Pleret:</strong> Koding seperti menulis <em>Standard Operating Procedure (SOP)</em> servis. Komputer akan membaca perintah kita baris per baris dari atas ke bawah secara presisi tanpa terlewat satu langkah pun.
      </div>

      <h3>Perintah Output: <code>print()</code></h3>
      <p>Di bahasa Python, perintah utama untuk menampilkan teks atau angka ke layar adalah <code>print()</code>. Teks diapit dengan tanda petik ganda <code>"..."</code> atau petik tunggal <code>'...'</code>.</p>
      
      <pre><code>print("Selamat datang di Bengkel TSM SMKN 1 Pleret!")
print(2026)
print("Servis Motor Injeksi Berkala")</code></pre>

      <h3>Mencetak Banyak Nilai Sekaligus</h3>
      <p>Kamu bisa mencetak beberapa informasi sekaligus dengan memisahkannya menggunakan tanda koma <code>,</code>. Python otomatis menambahkan spasi di antara nilai tersebut:</p>
      <pre><code>print("Tegangan aki:", 12.6, "Volt")
print("Status motor:", "Siap Servis")</code></pre>

      <h3>Komentar dalam Kode (<code>#</code>)</h3>
      <p>Tanda pagar <code>#</code> digunakan untuk menulis catatan atau keterangan mekanik. Baris yang diawali dengan <code>#</code> tidak akan dieksekusi oleh program:</p>
      <pre><code># Catatan mekanik: cek tekanan ban sebelum uji jalan
print("Pengecekan ban selesai")</code></pre>
    `,
    contohKode: `# Program 1: Kartu Pengenal Mekanik Muda TSM SMKN 1 Pleret
print("========================================")
print("    BENGKEL TSM SMKN 1 PLERET BANTUL    ")
print("========================================")
print("Nama Mekanik : Dimas Pratama")
print("Kelas        : X TSM 1")
print("Keahlian     : Servis Injeksi & Kelistrikan")
print("Motto        : Teliti, Terampil, Mandiri!")
print("========================================")
`
  },
  {
    id: "materi-2",
    nomor: "02",
    kategori: "Variabel & Data",
    judul: "Variabel & Tipe Data Spesifikasi Otomotif",
    deskripsi: "Memahami tempat penyimpanan data spesifikasi sepeda motor (String, Integer, Float, Boolean) di memori program.",
    isi: `
      <h3>Apa Itu Variabel di Dunia Koding?</h3>
      <p>Variabel adalah wadah penyimpanan di memori komputer yang memiliki nama untuk menyimpan data motor (seperti merk motor, kapasitas oli, atau nomor polisi).</p>
      
      <div class="note-box">
        <strong>📦 Analogi Kotak Perkakas:</strong> Seperti laci di rak bengkel yang diberi label <em>"Kunci Ring 10"</em> atau label <em>"Busi Cadangan"</em>. Kita bisa mengambil atau mengganti isinya kapan saja sesuai kebutuhan.
      </div>

      <h3>Aturan Membuat Variabel di Python:</h3>
      <ul>
        <li>Gunakan huruf kecil dan pisahkan kata dengan garis bawah / underscore (<em>snake_case</em>), contoh: <code>merk_motor</code>, <code>jarak_tempuh</code>.</li>
        <li>Jangan gunakan spasi dan jangan diawali dengan angka (misal: <code>1motor</code> ❌ salah, <code>motor_1</code> ✔️ benar).</li>
        <li>Di Python, kamu tidak perlu mengetik tipe data secara manual, cukup langsung isi nilainya dengan tanda sama dengan <code>=</code>.</li>
      </ul>

      <h3>4 Tipe Data Utama di Jurusan TSM:</h3>
      <table class="materi-table">
        <tr><th>Tipe Data</th><th>Nama di Python</th><th>Contoh di Bengkel Motor</th></tr>
        <tr><td><strong>String (Teks)</strong></td><td><code>str</code></td><td><code>"Honda Vario 160"</code>, <code>"AB 1234 XY"</code></td></tr>
        <tr><td><strong>Integer (Bilangan Bulat)</strong></td><td><code>int</code></td><td><code>4</code> (langkah mesin), <code>8500</code> (RPM mesin)</td></tr>
        <tr><td><strong>Float (Desimal/Pecahan)</strong></td><td><code>float</code></td><td><code>0.8</code> (liter oli), <code>12.4</code> (voltase aki)</td></tr>
        <tr><td><strong>Boolean (Benar / Salah)</strong></td><td><code>bool</code></td><td><code>True</code> (kontak ON), <code>False</code> (lampu mati)</td></tr>
      </table>
    `,
    contohKode: `# Program 2: Lembar Input Servis Masuk Motor
merk_motor = "Yamaha NMAX 155"
nomor_polisi = "AB 5678 ZP"
tahun_rakit = 2023
kapasitas_oli_liter = 0.9
sudah_injeksi = True

print("--- DATA MOTOR MASUK BENGKEL ---")
print("Merk Unit   :", merk_motor)
print("No. Plat    :", nomor_polisi)
print("Tahun       :", tahun_rakit)
print("Kapasitas Oli:", kapasitas_oli_liter, "Liter")
print("Sistem FI   :", sudah_injeksi)
`
  },
  {
    id: "materi-3",
    nomor: "03",
    kategori: "Operator Mesin",
    judul: "Operator Aritmatika & Rumus Kapasitas Silinder (CC)",
    deskripsi: "Melakukan perhitungan teknis otomotif seperti kapasitas volume silinder, rasio kompresi, dan konsumsi bensin.",
    isi: `
      <h3>Operator Aritmatika Matematika di Python</h3>
      <table class="materi-table">
        <tr><th>Operator</th><th>Fungsi</th><th>Contoh Python</th><th>Hasil</th></tr>
        <tr><td><code>+</code></td><td>Penjumlahan</td><td><code>50000 + 45000</code></td><td>95000 (Jasa + Oli)</td></tr>
        <tr><td><code>-</code></td><td>Pengurangan</td><td><code>100000 - 15000</code></td><td>85000 (Diskon Servis)</td></tr>
        <tr><td><code>*</code></td><td>Perkalian</td><td><code>4 * 125</code></td><td>500</td></tr>
        <tr><td><code>/</code></td><td>Pembagian (Desimal)</td><td><code>200 / 4</code></td><td>50.0</td></tr>
        <tr><td><code>**</code></td><td>Pangkat</td><td><code>5 ** 2</code></td><td>25 (5 kuadrat)</td></tr>
        <tr><td><code>%</code></td><td>Modulus (Sisa Bagi)</td><td><code>10 % 3</code></td><td>1</td></tr>
      </table>

      <h3>Rumus Teknis TSM: Menghitung Volume Silinder (Displacement CC)</h3>
      <p>Setiap mekanik TSM wajib menguasai rumus kapasitas mesin <em>bore & stroke</em>:</p>
      <div class="note-box">
        <strong>📐 Rumus Kapasitas Mesin:</strong><br>
        <code>cc = 0.7854 * bore * bore * stroke / 1000</code><br>
        <em>Keterangan: <code>bore</code> = diameter piston (mm), <code>stroke</code> = langkah piston (mm). Nilai 0.7854 adalah aproksimasi dari π / 4.</em>
      </div>

      <h3>Fungsi Pembulatan: <code>round()</code></h3>
      <p>Untuk membulatkan angka desimal koma panjang, gunakan fungsi <code>round(angka, jumlah_desimal)</code>:</p>
      <pre><code>hasil = round(109.5123, 1)
print(hasil) # Menghasilkan 109.5</code></pre>
    `,
    contohKode: `# Program 3: Menghitung Kapasitas Mesin Honda BeAT
# Spesifikasi teknis pabrikan:
bore = 47.0    # diameter piston dalam mm
stroke = 63.1  # panjang langkah piston dalam mm

# Rumus volume silinder mesin:
# Volume = (pi / 4) * bore^2 * stroke / 1000
volume_cc = 0.7854 * (bore ** 2) * stroke / 1000

print("Bore (Diameter Piston) :", bore, "mm")
print("Stroke (Langkah Piston):", stroke, "mm")
print("Kapasitas Mesin Asli   :", volume_cc, "cc")
print("Kapasitas Dibulatkan   :", round(volume_cc, 1), "cc")
`
  },
  {
    id: "materi-4",
    nomor: "04",
    kategori: "Percabangan",
    judul: "Percabangan if-elif-else: Diagnosa Aki & Kerusakan Motor",
    deskripsi: "Menerapkan logika keputusan komputer untuk sistem diagnosa kelistrikan aki dan reminder servis berkala.",
    isi: `
      <h3>Logika Keputusan pada Komputer ECU Motor</h3>
      <p>ECU motor terus-menerus mengambil keputusan berdasarkan sinyal sensor: <em>"Jika suhu mesin terlalu panas, maka nyalakan kipas radiator!"</em> atau <em>"Jika standar samping diturunkan, maka matikan mesin!"</em>.</p>
      
      <h3>Struktur <code>if - elif - else</code> di Python:</h3>
      <pre><code>if kondisi_1:
    # Aksi jika kondisi_1 Benar (True)
elif kondisi_2:
    # Aksi jika kondisi_2 Benar
else:
    # Aksi jika semua kondisi di atas Salah</code></pre>

      <div class="note-box">
        <strong>⚠️ PENTING - Indentasi (Spasi Menjorok ke Dalam):</strong> Di Python, baris di dalam <code>if</code>, <code>elif</code>, atau <code>else</code> <strong>wajib menjorok 4 spasi</strong> (tekan tombol Tab). Jika tidak menjorok, Python akan error <em>IndentationError</em>!
      </div>

      <h3>Operator Pembanding:</h3>
      <ul>
        <li><code>==</code> (sama dengan)</li>
        <li><code>!=</code> (tidak sama dengan)</li>
        <li><code>&gt;</code> (lebih besar dari) dan <code>&lt;</code> (lebih kecil dari)</li>
        <li><code>&gt;=</code> (lebih besar atau sama dengan) dan <code>&lt;=</code> (lebih kecil atau sama dengan)</li>
      </ul>
    `,
    contohKode: `# Program 4: Diagnosa Tegangan Aki (Accu) Motor dengan Multitester
tegangan_aki = 12.2 # Satuan Volt

print("Hasil Pembacaan Multitester:", tegangan_aki, "Volt")

if tegangan_aki >= 12.5:
    print("STATUS: Aki dalam kondisi PRIMA (Normal)")
    print("Tindakan: Siap digunakan, starter elektrik normal.")
elif tegangan_aki >= 12.0:
    print("STATUS: Aki LEMAH (Perlu Perhatian)")
    print("Tindakan: Cek cairan aki atau cas aki (recharge).")
else:
    print("STATUS: Aki DROP / SOAK!")
    print("Tindakan: Segera ganti aki baru, motor berisiko mogok.")
`
  },
  {
    id: "materi-5",
    nomor: "05",
    kategori: "Perulangan",
    judul: "Perulangan for & while: Siklus 4-Tak & Kalibrasi Mesin",
    deskripsi: "Mengotomasi instruksi berulang untuk simulasi siklus mesin 4-langkah dan checklist servis berkala.",
    isi: `
      <h3>Mengapa Perulangan Dibutuhkan?</h3>
      <p>Daripada menulis perintah yang sama berkali-kali, kita menggunakan perulangan (<em>looping</em>). Bayangkan mesin motor yang berputar ribuan kali per menit (RPM) melakukan siklus yang sama terus menerus.</p>

      <h3>1. Perulangan <code>for</code> dengan List / Daftar:</h3>
      <p>Sangat cocok untuk memeriksa daftar komponen servis atau langkah kerja mesin:</p>
      <pre><code>daftar_servis = ["Ganti Oli", "Cek Busi", "Setel Rantai", "Cek Rem"]
for tugas in daftar_servis:
    print("Mengerjakan:", tugas)</code></pre>

      <h3>2. Perulangan <code>for</code> dengan <code>range()</code>:</h3>
      <p>Digunakan untuk mengulang instruksi sebanyak hitungan angka tertentu:</p>
      <pre><code># Mengulang dari putaran ke-1 sampai ke-4
for langkah in range(1, 5):
    print("Langkah ke-", langkah)</code></pre>

      <div class="note-box">
        <strong>⚙️ Fakta Mesin 4-Tak:</strong> Satu siklus pembakaran mesin 4 langkah terdiri dari: 1. Hisap (Intake), 2. Kompresi (Compression), 3. Usaha (Power), 4. Buang (Exhaust).
      </div>
    `,
    contohKode: `# Program 5: Simulasi 4 Langkah Kerja Mesin 4-Tak
langkah_4tak = [
    "1. Langkah HISAP     (Katup masuk terbuka, campuran udara & bensin masuk)",
    "2. Langkah KOMPRESI  (Kedua katup tertutup, piston memampatkan gas)",
    "3. Langkah USAHA     (Busi memercikkan api, terjadi ledakan tenaga)",
    "4. Langkah BUANG     (Katup buang terbuka, sisa gas pembakaran dibuang)"
]

print("=== SIMULASI SIKLUS KERJA MESIN 4-TAK ===")
for langkah in langkah_4tak:
    print(langkah)

print("\n--- KALIBRASI STASIONER RPM MOTOR ---")
for rpm in range(1000, 1500, 100):
    print("Menyetel putaran mesin:", rpm, "RPM...")
print("RPM stasioner ideal tercapai (1400 RPM)!")
`
  },
  {
    id: "materi-6",
    nomor: "06",
    kategori: "Fungsi Modular",
    judul: "Fungsi (def) Kalkulator Kasir & Teknis Bengkel TSM",
    deskripsi: "Membungkus rumus perhitungan ke dalam fungsi mandiri agar dapat dipanggil berkali-kali untuk berbagai motor konsumen.",
    isi: `
      <h3>Apa Itu Fungsi (Function) di Python?</h3>
      <p>Fungsi adalah blok kode yang kita beri nama khusus untuk melakukan suatu tugas tertentu. Kita cukup menulis rumusnya <strong>satu kali</strong>, lalu kita bisa menggunakannya berulang kali untuk ratusan motor yang datang ke bengkel.</p>

      <div class="note-box">
        <strong>🛠️ Analogi Mesin Bor / Kompresor:</strong> Kamu tidak merakit kompresor angin dari nol setiap kali mau memompa ban. Kamu cukup colokkan dan gunakan alat tersebut kapan pun dibutuhkan!
      </div>

      <h3>Mendefinisikan Fungsi dengan Kata Kunci <code>def</code>:</h3>
      <pre><code>def sapa_pelanggan(nama_pemilik, motor):
    print("Selamat pagi Bapak/Ibu", nama_pemilik)
    print("Motor", motor, "siap diservis oleh siswa TSM SMKN 1 Pleret.")

# Memanggil fungsi:
sapa_pelanggan("Pak Slamet", "Supra X 125")</code></pre>

      <h3>Fungsi dengan Nilai Balik (<code>return</code>):</h3>
      <p>Kata kunci <code>return</code> digunakan agar fungsi menyerahkan hasil perhitungan kembali ke program untuk disimpan atau dicetak:</p>
      <pre><code>def hitung_cc(bore, stroke):
    cc = 0.7854 * (bore ** 2) * stroke / 1000
    return round(cc, 1)

# Panggil fungsi:
hasil_cc = hitung_cc(50.0, 55.1)
print("Volume Mesin:", hasil_cc, "cc")</code></pre>
    `,
    contohKode: `# Program 6: Fungsi Penghitung Total Biaya Servis di Bengkel TSM
def hitung_biaya_servis(jasa, oli, busi, persen_diskon):
    total_kotor = jasa + oli + busi
    potongan = total_kotor * (persen_diskon / 100)
    total_bersih = total_kotor - potongan
    return total_bersih

# Contoh Kasus Konsumen 1 (Diskon Guru/Siswa 10%):
total_bayar = hitung_biaya_servis(50000, 45000, 20000, 10)

print("=== NOTA PEMBAYARAN BENGKEL TSM SMKN 1 PLERET ===")
print("Biaya Jasa Servis : Rp 50.000")
print("Oli Mesin Matic   : Rp 45.000")
print("Busi Standar      : Rp 20.000")
print("Diskon Pelajar    : 10%")
print("-------------------------------------------------")
print("TOTAL DIBAYAR     : Rp", int(total_bayar))
`
  }
];

const DATA_LATIHAN = [
  {
    id: "latihan-1",
    nomor: "Latihan 01",
    tingkat: "Mudah",
    kategori: "Dasar & Output",
    judul: "Kartu Pengenal Mekanik Siswa TSM",
    deskripsi: "Buatlah program Python yang mencetak identitas diri kamu sebagai mekanik siswa TSM SMKN 1 Pleret menggunakan fungsi print().",
    petunjuk: [
      "Gunakan variabel <code>nama_siswa</code> untuk menyimpan nama lengkapmu.",
      "Gunakan variabel <code>kelas</code> untuk menyimpan kelasmu (misal: <code>'X TSM 1'</code> atau <code>'X TSM 2'</code>).",
      "Gunakan variabel <code>sekolah</code> berisi <code>'SMKN 1 Pleret'</code>.",
      "Gunakan <code>print()</code> untuk mencetak minimal 3 baris:",
      "1. Baris berisi nama siswa (contoh: <code>Nama Mekanik: Ahmad Zaki</code>)",
      "2. Baris berisi kelas (contoh: <code>Kelas: X TSM 1</code>)",
      "3. Baris berisi sekolah (contoh: <code>Sekolah: SMKN 1 Pleret</code>)"
    ],
    starterKode: `# ==============================================================
# LATIHAN 1: KARTU PENGENAL MEKANIK SISWA TSM SMKN 1 PLERET
# ==============================================================
# Tulis kode program kamu di bawah ini:

nama_siswa = "Muhammad Rizki"
kelas = "X TSM 1"
sekolah = "SMKN 1 Pleret"

# Gunakan fungsi print() untuk menampilkan identitas sesuai petunjuk:

`,
    validate: function(logs, userCode) {
      if (!logs || logs.length === 0) {
        return { pass: false, message: "Program belum menghasilkan output apapun. Gunakan perintah print() untuk menampilkan data." };
      }
      const combined = logs.join(" ").toLowerCase();
      
      const hasNama = combined.includes("nama") || combined.includes("mekanik") || combined.includes("rizki");
      const hasKelas = combined.includes("tsm") || combined.includes("kelas");
      const hasSekolah = combined.includes("pleret") || combined.includes("smkn 1");

      if (!hasNama) {
        return { pass: false, message: "Output belum mencantumkan nama mekanik siswa. Pastikan perintah print() mencetak nama." };
      }
      if (!hasKelas) {
        return { pass: false, message: "Output belum mencantumkan kelas (misal: 'X TSM 1')." };
      }
      if (!hasSekolah) {
        return { pass: false, message: "Output belum mencantumkan identitas sekolah 'SMKN 1 Pleret'." };
      }

      return { pass: true, message: "Bagus sekali! Kartu pengenal mekanik siswa TSM berhasil ditampilkan dengan rapi." };
    }
  },
  {
    id: "latihan-2",
    nomor: "Latihan 02",
    tingkat: "Mudah",
    kategori: "Variabel & Data",
    judul: "Lembar Spesifikasi Motor Servis Masuk",
    deskripsi: "Simpan data motor pelanggan yang masuk bengkel ke dalam 4 variabel dengan tipe data yang tepat (String, Integer, Float, Boolean) dan tampilkan.",
    petunjuk: [
      "Buat variabel <code>merk_motor</code> dengan nilai String (misal: <code>'Honda Vario 125'</code>).",
      "Buat variabel <code>odometer_km</code> dengan nilai Integer jarak tempuh (misal: <code>15000</code>).",
      "Buat variabel <code>kapasitas_oli</code> dengan nilai Float liter oli (misal: <code>0.8</code>).",
      "Buat variabel <code>sudah_injeksi</code> dengan nilai Boolean (<code>True</code>).",
      "Cetak keempat variabel tersebut ke konsol menggunakan <code>print()</code>."
    ],
    starterKode: `# ==============================================================
# LATIHAN 2: LEMBAR SPESIFIKASI MOTOR SERVIS MASUK
# ==============================================================

# 1. Deklarasikan 4 variabel sesuai petunjuk:
merk_motor = "Honda Vario 125"
odometer_km = 15000
kapasitas_oli = 0.8
sudah_injeksi = True

# 2. Tampilkan semua data motor ke layar menggunakan print():

`,
    validate: function(logs, userCode) {
      if (!logs || logs.length === 0) {
        return { pass: false, message: "Program belum menghasilkan output apapun. Silakan cetak data dengan print()." };
      }
      const combined = logs.join(" ").toLowerCase();
      
      const hasOli = combined.includes("0.8") || combined.includes("oli");
      const hasOdo = combined.includes("15000") || combined.includes("km") || combined.includes("odometer");
      const hasMotor = combined.includes("vario") || combined.includes("honda") || combined.includes("motor");
      const hasBool = combined.includes("true") || combined.includes("injeksi") || combined.includes("fi");

      if (!hasMotor) {
        return { pass: false, message: "Output belum menampilkan merk motor pelanggan." };
      }
      if (!hasOdo) {
        return { pass: false, message: "Output belum menampilkan angka jarak tempuh odometer (15000 KM)." };
      }
      if (!hasOli) {
        return { pass: false, message: "Output belum menampilkan kapasitas oli mesin (0.8 Liter)." };
      }
      if (!hasBool) {
        return { pass: false, message: "Output belum menampilkan status injeksi (True)." };
      }

      return { pass: true, message: "Luar biasa! 4 tipe data dasar spesifikasi motor berhasil dideklarasikan dan dicetak dengan benar." };
    }
  },
  {
    id: "latihan-3",
    nomor: "Latihan 03",
    tingkat: "Sedang",
    kategori: "Operator Mesin",
    judul: "Kalkulator Kapasitas Mesin (CC) Silinder Motor",
    deskripsi: "Hitung volume langkah silinder mesin motor (cc) dari nilai diameter piston (bore) dan langkah piston (stroke) menggunakan rumus matematika Python.",
    petunjuk: [
      "Diketahui: <code>bore = 50.0</code> (mm) dan <code>stroke = 55.1</code> (mm).",
      "Gunakan rumus volume silinder: <code>volume_cc = 0.7854 * bore * bore * stroke / 1000</code>",
      "Gunakan fungsi <code>round(volume_cc, 1)</code> untuk membulatkan hasil menjadi 1 angka di belakang koma.",
      "Cetak hasil kapasitas mesin ke konsol (hasil yang diharapkan adalah sekitar <code>108.1</code> atau <code>108.2</code> cc)."
    ],
    starterKode: `# ==============================================================
# LATIHAN 3: MENGHITUNG KAPASITAS MESIN (CC)
# ==============================================================
bore = 50.0    # Diameter piston (mm)
stroke = 55.1  # Panjang langkah piston (mm)

# Hitung kapasitas silinder (cc) menggunakan rumus:
# volume_cc = 0.7854 * bore * bore * stroke / 1000


# Cetak hasil volume cc yang sudah dibulatkan:

`,
    validate: function(logs, userCode) {
      if (!logs || logs.length === 0) {
        return { pass: false, message: "Belum ada output yang dicetak. Hitung volume_cc dan cetak dengan print()." };
      }
      const combined = logs.join(" ");
      
      const hasCcVal = combined.includes("108.1") || combined.includes("108.2") || combined.includes("108");
      
      if (!hasCcVal) {
        return { 
          pass: false, 
          message: "Nilai cc mesin belum tepat. Periksa kembali rumus: 0.7854 * bore * bore * stroke / 1000. Hasil seharusnya sekitar 108.1 cc." 
        };
      }

      return { pass: true, message: "Tepat sekali! Perhitungan volume langkah silinder mesin motor akurat (108.1 cc)." };
    }
  },
  {
    id: "latihan-4",
    nomor: "Latihan 04",
    tingkat: "Sedang",
    kategori: "Percabangan",
    judul: "Sistem Pengingat Ganti Oli Mesin Berkala",
    deskripsi: "Gunakan percabangan if-else untuk memeriksa apakah motor pelanggan sudah melebihi batas anjuran jarak tempuh ganti oli berkala (4.000 KM).",
    petunjuk: [
      "Diberikan variabel <code>jarak_km = 4500</code>.",
      "Buat kondisi: jika <code>jarak_km >= 4000</code>, cetak kalimat yang mengandung kata <code>'Waktunya ganti oli'</code>.",
      "Jika kurang dari 4000 (bagian <code>else</code>), cetak kalimat yang mengandung kata <code>'Oli masih aman'</code>.",
      "Ingat: perhatikan titik dua <code>:</code> dan indentasi (4 spasi) setelah if dan else."
    ],
    starterKode: `# ==============================================================
# LATIHAN 4: INDIKATOR GANTI OLI MESIN BERKALA
# ==============================================================
jarak_km = 4500 # Jarak tempuh sejak ganti oli terakhir (KM)

# Buat percabangan if - else di bawah ini:
if jarak_km >= 4000:
    # Tulis pesan ganti oli:
    pass
else:
    # Tulis pesan oli masih aman:
    pass
`,
    validate: function(logs, userCode) {
      if (!logs || logs.length === 0) {
        return { pass: false, message: "Program belum menghasilkan output. Lengkapi blok if dan else dengan print()." };
      }
      const combined = logs.join(" ").toLowerCase();

      if (!userCode.includes("if ") || !userCode.includes("else:")) {
        return { pass: false, message: "Program wajib menggunakan struktur percabangan if dan else." };
      }

      const hasGantiOli = combined.includes("ganti oli") || combined.includes("waktunya ganti");
      if (!hasGantiOli) {
        return { pass: false, message: "Untuk jarak_km = 4500, program harus mencetak peringatan 'Waktunya ganti oli'." };
      }

      return { pass: true, message: "Sangat bagus! Logika sistem pengingat ganti oli motor bekerja dengan sempurna." };
    }
  },
  {
    id: "latihan-5",
    nomor: "Latihan 05",
    tingkat: "Menengah",
    kategori: "Percabangan",
    judul: "Diagnosa Tegangan Aki Motor dengan Multitester",
    deskripsi: "Buatlah sistem diagnosa bertingkat (if - elif - else) untuk menganalisis kondisi kesehatan aki motor berdasarkan pembacaan voltmeter.",
    petunjuk: [
      "Diberikan variabel <code>voltase = 11.8</code> (Volt).",
      "Kondisi 1: jika <code>voltase >= 12.5</code>, cetak pesan: <code>'Kondisi Prima'</code>.",
      "Kondisi 2: jika <code>voltase >= 12.0</code> (gunakan <code>elif</code>), cetak pesan: <code>'Tegangan Lemah'</code>.",
      "Kondisi 3: selain itu (bagian <code>else</code>), cetak pesan: <code>'Aki Drop / Soak'</code>.",
      "Untuk nilai 11.8 Volt, program seharusnya mencetak <code>Aki Drop / Soak</code>."
    ],
    starterKode: `# ==============================================================
# LATIHAN 5: DIAGNOSA KESEHATAN AKI MOTOR
# ==============================================================
voltase = 11.8 # Hasil pengukuran multitester

# Tulis struktur if - elif - else untuk mendiagnosa kondisi aki:


`,
    validate: function(logs, userCode) {
      if (!logs || logs.length === 0) {
        return { pass: false, message: "Belum ada output yang dicetak. Lengkapi percabangan dengan print()." };
      }
      const combined = logs.join(" ").toLowerCase();

      if (!userCode.includes("if ") || !userCode.includes("elif ") || !userCode.includes("else")) {
        return { pass: false, message: "Gunakan struktur percabangan lengkap: if, elif, dan else." };
      }

      const hasDrop = combined.includes("drop") || combined.includes("soak") || combined.includes("ganti aki");
      if (!hasDrop) {
        return { pass: false, message: "Dengan nilai voltase 11.8 Volt, hasil yang harus tercetak adalah kondisi 'Aki Drop / Soak'." };
      }

      return { pass: true, message: "Mantap! Diagnosa kelistrikan aki motor 3 kondisi (if-elif-else) sukses teruji." };
    }
  },
  {
    id: "latihan-6",
    nomor: "Latihan 06",
    tingkat: "Menengah",
    kategori: "Perulangan",
    judul: "Pengecekan Siklus 4-Langkah Kerja Mesin 4-Tak",
    deskripsi: "Gunakan perulangan for loop untuk mencetak 4 langkah kerja siklus pembakaran mesin 4 langkah (Hisap, Kompresi, Usaha, Buang).",
    petunjuk: [
      "Disediakan list <code>langkah_kerja = ['1. Langkah Hisap', '2. Langkah Kompresi', '3. Langkah Usaha', '4. Langkah Buang']</code>.",
      "Gunakan perulangan <code>for langkah in langkah_kerja:</code>.",
      "Di dalam blok loop, cetak variabel <code>langkah</code> menggunakan <code>print()</code>.",
      "Pastikan semua 4 langkah tercetak berurutan di terminal."
    ],
    starterKode: `# ==============================================================
# LATIHAN 6: SIKLUS 4-LANGKAH KERJA MESIN 4-TAK
# ==============================================================
langkah_kerja = [
    "1. Langkah Hisap",
    "2. Langkah Kompresi",
    "3. Langkah Usaha",
    "4. Langkah Buang"
]

# Gunakan perulangan for untuk mencetak setiap langkah:


`,
    validate: function(logs, userCode) {
      if (!logs || logs.length === 0) {
        return { pass: false, message: "Program belum mencetak output apapun. Gunakan perulangan for dan print()." };
      }
      const combined = logs.join(" ").toLowerCase();

      if (!userCode.includes("for ") || !userCode.includes(" in ")) {
        return { pass: false, message: "Program wajib menggunakan sintaks perulangan 'for ... in ...'." };
      }

      const hasHisap = combined.includes("hisap");
      const hasKompresi = combined.includes("kompresi");
      const hasUsaha = combined.includes("usaha");
      const hasBuang = combined.includes("buang");

      if (!hasHisap || !hasKompresi || !hasUsaha || !hasBuang) {
        return { pass: false, message: "Pastikan keempat siklus (Hisap, Kompresi, Usaha, Buang) tercetak lengkap oleh perulangan for." };
      }

      return { pass: true, message: "Sempurna! Perulangan for berhasil mensimulasikan siklus 4 langkah mesin motor." };
    }
  },
  {
    id: "latihan-7",
    nomor: "Latihan 07",
    tingkat: "Tantangan",
    kategori: "Fungsi Modular",
    judul: "Fungsi Kalkulator Nota Servis Bengkel TSM",
    deskripsi: "Buat fungsi Python bernama hitung_total_servis() yang menerima 3 parameter biaya, menjumlahkannya, dan mengembalikan total pembayaran ke pelanggan.",
    petunjuk: [
      "Definisikan fungsi dengan: <code>def hitung_total_servis(biaya_jasa, harga_oli, harga_busi):</code>",
      "Di dalam fungsi, jumlahkan ketiga biaya tersebut: <code>total = biaya_jasa + harga_oli + harga_busi</code>.",
      "Kembalikan nilai <code>total</code> menggunakan kata kunci <code>return</code>.",
      "Panggil fungsi tersebut dengan nilai: jasa = <code>40000</code>, oli = <code>45000</code>, busi = <code>25000</code>.",
      "Cetak total biaya yang dihasilkan (total = 110000) menggunakan <code>print()</code>."
    ],
    starterKode: `# ==============================================================
# LATIHAN 7: FUNGSI KALKULATOR NOTA SERVIS BENGKEL TSM
# ==============================================================

# 1. Definisikan fungsi hitung_total_servis di bawah ini:
def hitung_total_servis(biaya_jasa, harga_oli, harga_busi):
    # Hitung total dan kembalikan dengan return:
    pass

# 2. Panggil fungsi dengan biaya: jasa 40000, oli 45000, busi 25000:
total_bayar = hitung_total_servis(40000, 45000, 25000)

# 3. Cetak hasil total_bayar ke konsol:
print("Total Tagihan Servis: Rp", total_bayar)
`,
    validate: function(logs, userCode) {
      if (!logs || logs.length === 0) {
        return { pass: false, message: "Belum ada output nota servis yang dicetak." };
      }
      const combined = logs.join(" ");

      if (!userCode.includes("def hitung_total_servis")) {
        return { pass: false, message: "Wajib mendefinisikan fungsi bernama 'def hitung_total_servis(biaya_jasa, harga_oli, harga_busi)'." };
      }
      if (!userCode.includes("return")) {
        return { pass: false, message: "Fungsi harus mengembalikan nilai hasil perhitungan menggunakan kata kunci 'return'." };
      }

      const has110k = combined.includes("110000") || combined.includes("110.000");
      if (!has110k) {
        return { 
          pass: false, 
          message: "Hasil total tagihan belum tepat. Penjumlahan 40.000 + 45.000 + 25.000 harus menghasilkan 110.000." 
        };
      }

      return { pass: true, message: "Luar Biasa! Fungsi modular nota kasir bengkel TSM berhasil diimplementasikan dengan nilai return yang tepat (Rp 110.000)." };
    }
  }
];

// Data Kamus / Cheat Sheet Singkat Python TSM untuk Siswa
const KAMUS_PYTHON_TSM = [
  {
    perintah: "print(nilai)",
    fungsi: "Mencetak teks atau angka ke konsol terminal simulator",
    contoh: "print('Motor Siap Digas!')"
  },
  {
    perintah: "variabel = nilai",
    fungsi: "Menyimpan data otomotif ke dalam wadah memori (str, int, float, bool)",
    contoh: "oli = 0.8\nmerk = 'Honda Beat'"
  },
  {
    perintah: "+, -, *, /, **",
    fungsi: "Operator matematika: tambah, kurang, kali, bagi, pangkat (kuadrat)",
    contoh: "cc = 0.7854 * (bore ** 2) * stroke / 1000"
  },
  {
    perintah: "round(angka, desimal)",
    fungsi: "Membulatkan angka desimal koma panjang",
    contoh: "round(108.128, 1)  # Hasil: 108.1"
  },
  {
    perintah: "if - elif - else",
    fungsi: "Percabangan logika keputusan untuk diagnosa kondisi motor",
    contoh: "if volt < 12.0:\n    print('Aki Soak')\nelse:\n    print('Normal')"
  },
  {
    perintah: "for item in daftar:",
    fungsi: "Perulangan memeriksa setiap elemen urutan langkah kerja",
    contoh: "for part in ['Oli', 'Busi']:\n    print('Cek', part)"
  },
  {
    perintah: "for i in range(awal, akhir):",
    fungsi: "Perulangan hitungan angka (misal menghitung putaran RPM)",
    contoh: "for rpm in range(1000, 1500, 100):\n    print(rpm)"
  },
  {
    perintah: "def nama_fungsi(param):",
    fungsi: "Membungkus rumus teknis/nota servis agar bisa dipanggil berulang kali",
    contoh: "def hitung(a, b):\n    return a + b"
  }
];
