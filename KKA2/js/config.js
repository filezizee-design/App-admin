/**
 * Konfigurasi Aplikasi Latihan Koding Dasar Siswa SMK Kelas X
 * Jurusan: Teknik Sepeda Motor (TSM) - SMKN 1 Pleret
 */
const APP_CONFIG = {
  // Identitas Aplikasi & Sekolah
  appName: "KodingTSM",
  schoolName: "SMKN 1 Pleret",
  jurusan: "Teknik Sepeda Motor (TSM)",
  tingkat: "Kelas X",
  appSubtitle: "Media Latihan Koding Python Dasar Berbasis Studi Kasus Otomotif",
  
  // Pilihan Jurusan / Kelas untuk Siswa TSM (Hanya 2: TSM I dan TSM R)
  daftarKelas: [
    "TSM I",
    "TSM R"
  ],

  // Password Akses Menu Guru (Default: guru123, dapat diganti oleh guru di menu pengaturan)
  guruPasswordDefault: "guru123",

  // URL Google Apps Script Web App (Endpoint Penerima Sheet)
  // Guru dapat menempelkan URL Web App dari Google Spreadsheet di sini atau lewat menu 'Pengaturan Guru' di web.
  // Contoh format URL:
  // "https://script.google.com/macros/s/AKfycby.../exec"
  defaultGoogleScriptUrl: "",

  // Key untuk penyimpanan lokal browser (localStorage)
  STORAGE_KEYS: {
    SCRIPT_URL: "kodingtsm_google_script_url",
    STUDENT_PROFILE: "kodingtsm_student_profile",
    EXERCISE_PROGRESS: "kodingtsm_progress_data",
    SUBMISSION_HISTORY: "kodingtsm_submission_history",
    DRAFT_CODE: "kodingtsm_code_drafts_",
    GURU_PASSWORD: "kodingtsm_guru_password"
  },

  // Mendapatkan URL Google Script aktif (dari localStorage jika sudah diubah guru, atau default)
  getGoogleScriptUrl: function() {
    const saved = localStorage.getItem(this.STORAGE_KEYS.SCRIPT_URL);
    if (saved && saved.trim() !== "") {
      return saved.trim();
    }
    return this.defaultGoogleScriptUrl.trim();
  },

  // Menyimpan URL Google Script baru
  setGoogleScriptUrl: function(url) {
    if (url && url.trim() !== "") {
      localStorage.setItem(this.STORAGE_KEYS.SCRIPT_URL, url.trim());
    } else {
      localStorage.removeItem(this.STORAGE_KEYS.SCRIPT_URL);
    }
  },

  // Mendapatkan password guru aktif (dari localStorage atau default)
  getGuruPassword: function() {
    const saved = localStorage.getItem(this.STORAGE_KEYS.GURU_PASSWORD);
    if (saved && saved.trim() !== "") {
      return saved.trim();
    }
    return this.guruPasswordDefault;
  },

  // Menyimpan password guru baru
  setGuruPassword: function(newPassword) {
    if (newPassword && newPassword.trim() !== "") {
      localStorage.setItem(this.STORAGE_KEYS.GURU_PASSWORD, newPassword.trim());
      return true;
    }
    return false;
  },

  // Verifikasi apakah password input cocok dengan password guru
  verifyGuruPassword: function(inputPassword) {
    if (!inputPassword) return false;
    return inputPassword.trim() === this.getGuruPassword();
  }
};
