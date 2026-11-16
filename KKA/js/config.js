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
  
  // Pilihan Kelas Default untuk Siswa
  daftarKelas: [
    "X TSM 1",
    "X TSM 2",
    "X TSM 3",
    "X TBSM 1",
    "X TBSM 2"
  ],

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
    DRAFT_CODE: "kodingtsm_code_drafts_"
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
  }
};
