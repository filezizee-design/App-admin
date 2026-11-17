/**
 * ==============================================================================
 * KodingTSM - Platform Latihan Koding Python Dasar Siswa SMK Kelas X
 * Jurusan : Teknik Sepeda Motor (TSM) - SMKN 1 Pleret
 * ==============================================================================
 */

// State Global Aplikasi
const state = {
  currentTab: 'materi', // 'materi' | 'latihan'
  selectedMateriId: 'materi-1',
  selectedLatihanId: 'latihan-1',
  studentProfile: {
    nama: '',
    kelas: '',
    noAbsen: '',
    nisn: ''
  },
  progress: {},
  history: [],
  isExecuting: false,
  isGuruAuthenticated: sessionStorage.getItem('kodingtsm_guru_auth') === 'true'
};

// Inisialisasi Aplikasi saat Dokumen Siap
document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  initNavigation();
  initEditorShortcuts();
  renderMateriList();
  renderLatihanList();
  renderActiveView();
  updateProgressStats();
  checkScriptUrlStatus();
  populateClassOptions();

  // Load Lucide Icons jika tersedia
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// ==========================================
// 1. MANAJEMEN PENYIMPANAN & STATE
// ==========================================
function loadSavedState() {
  // Load Profil Siswa
  const savedProfile = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.STUDENT_PROFILE);
  if (savedProfile) {
    try {
      state.studentProfile = JSON.parse(savedProfile);
      updateProfileDisplay();
    } catch (e) {
      console.error("Gagal memuat profil siswa:", e);
    }
  }

  // Load Progress Latihan
  const savedProgress = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.EXERCISE_PROGRESS);
  if (savedProgress) {
    try {
      state.progress = JSON.parse(savedProgress);
    } catch (e) {
      console.error("Gagal memuat progress:", e);
    }
  }

  // Load Riwayat Pengiriman ke Google Sheet
  const savedHistory = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.SUBMISSION_HISTORY);
  if (savedHistory) {
    try {
      state.history = JSON.parse(savedHistory);
    } catch (e) {
      console.error("Gagal memuat riwayat pengiriman:", e);
    }
  }
}

function saveStudentProfile() {
  localStorage.setItem(APP_CONFIG.STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(state.studentProfile));
  updateProfileDisplay();
}

function saveProgress() {
  localStorage.setItem(APP_CONFIG.STORAGE_KEYS.EXERCISE_PROGRESS, JSON.stringify(state.progress));
  updateProgressStats();
  renderLatihanList();
}

function saveSubmissionRecord(record) {
  state.history.unshift(record);
  localStorage.setItem(APP_CONFIG.STORAGE_KEYS.SUBMISSION_HISTORY, JSON.stringify(state.history));
  renderSubmissionHistory();
}

function populateClassOptions() {
  const select = document.getElementById('input-kelas-siswa');
  if (!select) return;

  const validClasses = APP_CONFIG.daftarKelas || ["TSM I", "TSM R"];
  let currentVal = state.studentProfile.kelas;

  // Jika belum ada atau kelas lama tidak valid di daftar 2 jurusan, arahkan ke default TSM I
  if (!currentVal || !validClasses.includes(currentVal)) {
    currentVal = validClasses[0];
  }

  select.innerHTML = '';
  validClasses.forEach(cls => {
    const opt = document.createElement('option');
    opt.value = cls;
    opt.textContent = cls;
    if (cls === currentVal) opt.selected = true;
    select.appendChild(opt);
  });
}

// ==========================================
// 2. NAVIGASI TAB & TAMPILAN
// ==========================================
function initNavigation() {
  const tabMateri = document.getElementById('tab-btn-materi');
  const tabLatihan = document.getElementById('tab-btn-latihan');

  if (tabMateri) tabMateri.addEventListener('click', () => switchTab('materi'));
  if (tabLatihan) tabLatihan.addEventListener('click', () => switchTab('latihan'));

  // Header action buttons
  const btnProfile = document.getElementById('btn-edit-profile');
  const btnGuru = document.getElementById('btn-guru-settings');
  const btnHistory = document.getElementById('btn-view-history');
  const btnKamus = document.getElementById('btn-open-kamus');

  if (btnProfile) btnProfile.addEventListener('click', openProfileModal);
  if (btnGuru) btnGuru.addEventListener('click', openGuruModal);
  if (btnHistory) btnHistory.addEventListener('click', openHistoryModal);
  if (btnKamus) btnKamus.addEventListener('click', openKamusModal);
}

function switchTab(tabName) {
  state.currentTab = tabName;
  const tabMateri = document.getElementById('tab-btn-materi');
  const tabLatihan = document.getElementById('tab-btn-latihan');
  const viewMateri = document.getElementById('view-materi');
  const viewLatihan = document.getElementById('view-latihan');
  const listMateri = document.getElementById('materi-list');
  const listLatihan = document.getElementById('latihan-list');

  if (tabName === 'materi') {
    tabMateri.className = "flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-600 text-white shadow-md shadow-amber-900/30 transition";
    tabLatihan.className = "flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition";
    
    viewMateri.classList.remove('hidden');
    viewLatihan.classList.add('hidden');
    if (listMateri) listMateri.classList.remove('hidden');
    if (listLatihan) listLatihan.classList.add('hidden');
  } else {
    tabLatihan.className = "flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-600 text-white shadow-md shadow-amber-900/30 transition";
    tabMateri.className = "flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition";
    
    viewLatihan.classList.remove('hidden');
    viewMateri.classList.add('hidden');
    if (listLatihan) listLatihan.classList.remove('hidden');
    if (listMateri) listMateri.classList.add('hidden');
  }
}

function renderMateriList() {
  const container = document.getElementById('materi-list');
  if (!container) return;
  container.innerHTML = '';

  DATA_MATERI.forEach(m => {
    const isSelected = m.id === state.selectedMateriId;
    const item = document.createElement('div');
    item.className = `p-3 rounded-xl cursor-pointer transition-all border ${
      isSelected 
        ? 'bg-amber-950/50 border-amber-500 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/50' 
        : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
    }`;
    item.innerHTML = `
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
          isSelected ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
        }">Modul ${m.nomor}</span>
        <span class="text-[11px] text-slate-400 font-medium">${m.kategori}</span>
      </div>
      <h4 class="font-semibold text-sm line-clamp-1">${m.judul}</h4>
      <p class="text-xs text-slate-400 line-clamp-1 mt-1">${m.deskripsi}</p>
    `;
    item.addEventListener('click', () => {
      state.selectedMateriId = m.id;
      renderMateriList();
      renderMateriDetail();
    });
    container.appendChild(item);
  });
}

function renderMateriDetail() {
  const materi = DATA_MATERI.find(m => m.id === state.selectedMateriId);
  if (!materi) return;

  const titleEl = document.getElementById('materi-detail-title');
  const catEl = document.getElementById('materi-detail-category');
  const descEl = document.getElementById('materi-detail-desc');
  const contentEl = document.getElementById('materi-detail-content');
  const sampleEditor = document.getElementById('materi-sample-code');

  if (titleEl) titleEl.innerText = `Modul ${materi.nomor}: ${materi.judul}`;
  if (catEl) catEl.innerText = materi.kategori;
  if (descEl) descEl.innerText = materi.deskripsi;
  if (contentEl) contentEl.innerHTML = materi.isi;
  if (sampleEditor) sampleEditor.value = materi.contohKode;

  clearMateriTerminal();
}

function renderLatihanList() {
  const container = document.getElementById('latihan-list');
  if (!container) return;
  container.innerHTML = '';

  DATA_LATIHAN.forEach(l => {
    const isSelected = l.id === state.selectedLatihanId;
    const progress = state.progress[l.id] || {};
    const isPassed = progress.passed;
    const isSubmitted = progress.submitted;

    let badgeClass = 'bg-slate-800 text-slate-400 border border-slate-700';
    let badgeText = 'Belum Dikerjakan';

    if (isSubmitted) {
      badgeClass = 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
      badgeText = 'Terkirim ke Sheet ✔';
    } else if (isPassed) {
      badgeClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
      badgeText = 'Lolos Uji (100) ★';
    }

    const item = document.createElement('div');
    item.className = `p-3 rounded-xl cursor-pointer transition-all border ${
      isSelected 
        ? 'bg-amber-950/50 border-amber-500 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/50' 
        : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
    }`;
    item.innerHTML = `
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
          isSelected ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
        }">${l.nomor}</span>
        <span class="text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeClass}">${badgeText}</span>
      </div>
      <h4 class="font-semibold text-sm line-clamp-1">${l.judul}</h4>
      <div class="flex items-center justify-between mt-2 text-[11px] text-slate-400">
        <span>${l.kategori}</span>
        <span class="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-medium">${l.tingkat}</span>
      </div>
    `;
    item.addEventListener('click', () => {
      saveCurrentCodeDraft();
      state.selectedLatihanId = l.id;
      renderLatihanList();
      renderLatihanDetail();
    });
    container.appendChild(item);
  });
}

function renderLatihanDetail() {
  const latihan = DATA_LATIHAN.find(l => l.id === state.selectedLatihanId);
  if (!latihan) return;

  const titleEl = document.getElementById('latihan-detail-title');
  const descEl = document.getElementById('latihan-detail-desc');
  const badgeEl = document.getElementById('latihan-detail-badge');
  const catEl = document.getElementById('latihan-detail-category');
  const petunjukContainer = document.getElementById('latihan-petunjuk-list');
  const editor = document.getElementById('code-editor');

  if (titleEl) titleEl.innerText = `${latihan.nomor}: ${latihan.judul}`;
  if (descEl) descEl.innerText = latihan.deskripsi;
  if (badgeEl) badgeEl.innerText = latihan.tingkat;
  if (catEl) catEl.innerText = latihan.kategori;

  // Render petunjuk pengerjaan
  if (petunjukContainer) {
    petunjukContainer.innerHTML = '';
    latihan.petunjuk.forEach(p => {
      const li = document.createElement('li');
      li.className = 'text-xs text-slate-300 leading-relaxed';
      li.innerHTML = p;
      petunjukContainer.appendChild(li);
    });
  }

  // Muat draft kode siswa jika ada, atau kembalikan ke starter code Python
  const savedDraft = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.DRAFT_CODE + latihan.id);
  if (editor) {
    editor.value = savedDraft !== null ? savedDraft : latihan.starterKode;
  }

  // Reset feedback & terminal
  updateValidationFeedback(null);
  clearTerminal();
  updateSubmitButtonStatus();
}

function renderActiveView() {
  renderMateriDetail();
  renderLatihanDetail();
}

function updateProgressStats() {
  const total = DATA_LATIHAN.length;
  let passedCount = 0;

  DATA_LATIHAN.forEach(l => {
    if (state.progress[l.id] && state.progress[l.id].passed) passedCount++;
  });

  const percent = Math.round((passedCount / total) * 100);
  const progressBar = document.getElementById('overall-progress-bar');
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }
  const progressText = document.getElementById('overall-progress-text');
  if (progressText) {
    progressText.innerText = `${passedCount}/${total} Selesai (${percent}%)`;
  }
}

function updateProfileDisplay() {
  const el = document.getElementById('header-student-name');
  if (el) {
    if (state.studentProfile.nama) {
      el.innerText = `${state.studentProfile.nama} (${state.studentProfile.kelas || 'X TSM'})`;
    } else {
      el.innerText = "Isi Profil Siswa";
    }
  }
}

function checkScriptUrlStatus() {
  const url = APP_CONFIG.getGoogleScriptUrl();
  const indicator = document.getElementById('sheet-status-badge');
  if (indicator) {
    if (url && url.length > 15) {
      indicator.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 cursor-pointer shadow-sm shadow-emerald-950/50" onclick="openGuruModal()" title="Klik untuk cek setelan">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Sheet Guru Terhubung
        </span>
      `;
    } else {
      indicator.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-700/80 cursor-pointer shadow-sm shadow-amber-950/50" onclick="openGuruModal()" title="Klik untuk memasang URL Google Sheet">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          Setel URL Sheet Guru
        </span>
      `;
    }
  }
}

// ==========================================
// 3. EDITOR SHORTCUTS & SUPPORT
// ==========================================
function initEditorShortcuts() {
  const editors = [document.getElementById('code-editor'), document.getElementById('materi-sample-code')];

  editors.forEach(editor => {
    if (!editor) return;
    editor.addEventListener('keydown', function(e) {
      // Mendukung tombol TAB untuk 4 spasi (standar Python)
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
      }
      
      // Shortcut Ctrl + Enter untuk menjalankan kode
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        if (editor.id === 'code-editor') {
          runPythonCodeAction('latihan');
        } else {
          runPythonCodeAction('materi');
        }
      }

      // Auto save draft ke local storage untuk code-editor latihan
      if (editor.id === 'code-editor') {
        saveCurrentCodeDraft();
      }
    });
  });
}

function saveCurrentCodeDraft() {
  const editor = document.getElementById('code-editor');
  if (editor && state.selectedLatihanId) {
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.DRAFT_CODE + state.selectedLatihanId, editor.value);
  }
}

function resetCurrentCode() {
  const latihan = DATA_LATIHAN.find(l => l.id === state.selectedLatihanId);
  if (!latihan) return;

  if (confirm("Kembalikan kode latihan ini ke template awal? Kode Python yang kamu ketik saat ini akan direset.")) {
    const editor = document.getElementById('code-editor');
    if (editor) editor.value = latihan.starterKode;
    saveCurrentCodeDraft();
    updateValidationFeedback(null);
    clearTerminal();
  }
}

function copySampleCode() {
  const editor = document.getElementById('materi-sample-code');
  if (!editor) return;
  navigator.clipboard.writeText(editor.value).then(() => {
    alert("Contoh kode Python berhasil disalin ke clipboard!");
  });
}

// ==========================================
// 4. MESIN EKSEKUSI PYTHON (SKULPT IN-BROWSER)
// ==========================================

/**
 * Menjalankan kode Python secara terisolasi di dalam browser menggunakan Skulpt
 */
function runPythonEngine(pythonSource, outputHandler) {
  return new Promise((resolve) => {
    if (typeof Sk === 'undefined') {
      resolve({
        success: false,
        error: "Library Python Skulpt belum selesai dimuat. Periksa file skulpt.min.js atau koneksi internet Anda.",
        logs: []
      });
      return;
    }

    const capturedLogs = [];

    // Fungsi output Skulpt
    function builtinRead(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
        throw "File not found: '" + x + "'";
      }
      return Sk.builtinFiles["files"][x];
    }

    Sk.configure({
      output: function(text) {
        // Skulpt mengalirkan karakter demi karakter / potongan teks
        if (outputHandler) outputHandler(text);
        capturedLogs.push(text);
      },
      read: builtinRead,
      __future__: Sk.python3,
      execLimit: 4000 // Batas maksimal 4 detik untuk mencegah infinite while-loop
    });

    const promise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, pythonSource, true);
    });

    promise.then(
      function(mod) {
        // Sukses menjalankan script Python
        const fullOutput = capturedLogs.join("");
        // Pisahkan per baris dan bersihkan
        const lines = fullOutput.split("\n")
          .map(l => l.trim())
          .filter(l => l.length > 0);

        resolve({
          success: true,
          logs: lines,
          rawOutput: fullOutput,
          code: pythonSource
        });
      },
      function(err) {
        // Terjadi error pada eksekusi Python
        let errorMsg = err.toString();
        let ramahSiswa = formatPythonErrorMessage(errorMsg);

        resolve({
          success: false,
          error: errorMsg,
          friendlyError: ramahSiswa,
          logs: capturedLogs,
          rawOutput: capturedLogs.join(""),
          code: pythonSource
        });
      }
    );
  });
}

/**
 * Menerjemahkan pesan error Python ke Bahasa Indonesia yang ramah untuk siswa SMK
 */
function formatPythonErrorMessage(errStr) {
  if (errStr.includes("IndentationError")) {
    return "⚠️ Kesalahan Indentasi (IndentationError): Pastikan baris kode di dalam 'if', 'elif', 'else', 'for', atau 'def' menjorok ke dalam (gunakan 4 spasi atau tombol Tab).";
  }
  if (errStr.includes("SyntaxError")) {
    return "⚠️ Kesalahan Sintaks (SyntaxError): Periksa tanda kurung (), tanda kutip \"\", atau tanda titik dua (:) di akhir baris if/for/def.";
  }
  if (errStr.includes("NameError")) {
    return "⚠️ Kesalahan Nama (NameError): Ada variabel atau nama fungsi yang belum dibuat atau salah ketik huruf besar/kecil.";
  }
  if (errStr.includes("TypeError")) {
    return "⚠️ Kesalahan Tipe Data (TypeError): Tipe data tidak cocok saat digabungkan atau dihitung. Gunakan tanda koma (,) di perintah print() atau konversi dengan str()/int().";
  }
  if (errStr.includes("ZeroDivisionError")) {
    return "⚠️ Kesalahan Pembagian Nol: Angka tidak bisa dibagi dengan nol (0).";
  }
  if (errStr.includes("TimeLimitError")) {
    return "⚠️ Waktu Eksekusi Habis: Program berhenti otomatis karena perulangan tanpa henti (infinite loop). Periksa kondisi while/for kamu.";
  }
  return `⚠️ ${errStr}`;
}

/**
 * Handler saat tombol "Jalankan (Run)" diklik
 */
async function runPythonCodeAction(mode = 'latihan') {
  if (state.isExecuting) return;

  const isLatihan = mode === 'latihan';
  const editor = isLatihan 
    ? document.getElementById('code-editor')
    : document.getElementById('materi-sample-code');

  const terminalId = isLatihan ? 'latihan-terminal' : 'materi-terminal';
  const terminal = document.getElementById(terminalId);

  if (!editor || !terminal) return;

  const userCode = editor.value;
  terminal.innerHTML = '';
  appendTerminalLine(terminal, "▶ Menjalankan program Python...", 'terminal-system');

  state.isExecuting = true;
  let buffer = '';

  const result = await runPythonEngine(userCode, function(chunk) {
    buffer += chunk;
    if (buffer.includes("\n")) {
      const parts = buffer.split("\n");
      for (let i = 0; i < parts.length - 1; i++) {
        appendTerminalLine(terminal, parts[i], 'terminal-log');
      }
      buffer = parts[parts.length - 1];
    }
  });

  if (buffer.length > 0) {
    appendTerminalLine(terminal, buffer, 'terminal-log');
  }

  state.isExecuting = false;

  if (result.success) {
    if (result.logs.length === 0) {
      appendTerminalLine(terminal, "(Program selesai tanpa output teks. Gunakan print() untuk menampilkan hasil)", 'terminal-system');
    } else {
      appendTerminalLine(terminal, "✔ Program Python selesai dijalankan tanpa error.", 'terminal-success');
    }
  } else {
    appendTerminalLine(terminal, `❌ Error Python: ${result.error}`, 'terminal-error');
    if (result.friendlyError) {
      appendTerminalLine(terminal, result.friendlyError, 'terminal-warn');
    }
  }

  return result;
}

/**
 * Handler saat tombol "Uji Jawaban" diklik
 */
async function testPythonCodeAction() {
  const terminal = document.getElementById('latihan-terminal');
  const latihan = DATA_LATIHAN.find(l => l.id === state.selectedLatihanId);
  if (!latihan) return;

  // Jalankan kode terlebih dahulu
  const result = await runPythonCodeAction('latihan');

  if (!result.success) {
    updateValidationFeedback({
      pass: false,
      message: `Terdapat error pada penulisan sintaks program Python: ${result.friendlyError || result.error}. Perbaiki dulu sebelum diuji.`
    });
    return;
  }

  // Jalankan validator otomatis latihan
  const validation = latihan.validate(result.logs, result.code);
  updateValidationFeedback(validation);

  if (validation.pass) {
    if (!state.progress[latihan.id]) {
      state.progress[latihan.id] = {};
    }
    state.progress[latihan.id].passed = true;
    state.progress[latihan.id].score = 100;
    saveProgress();
    updateSubmitButtonStatus();
  }
}

function updateValidationFeedback(validation) {
  const box = document.getElementById('validation-feedback-box');
  if (!box) return;

  if (!validation) {
    box.className = 'hidden';
    box.innerHTML = '';
    return;
  }

  box.classList.remove('hidden');
  if (validation.pass) {
    box.className = 'p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm flex items-start gap-3 shadow-lg shadow-emerald-950/50';
    box.innerHTML = `
      <div class="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <div class="flex-1">
        <h5 class="font-bold text-emerald-300">Selamat! Jawaban Koding Lolos Pengujian (Skor: 100/100)</h5>
        <p class="text-xs text-emerald-200/90 mt-1">${validation.message}</p>
        <p class="text-[11px] text-emerald-300/90 mt-2 font-medium">👉 Tekan tombol <strong>"Kirim Nilai ke Sheet Guru"</strong> di bawah untuk menyerahkan tugas.</p>
      </div>
    `;
  } else {
    box.className = 'p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-sm flex items-start gap-3 shadow-lg shadow-rose-950/50';
    box.innerHTML = `
      <div class="p-1 rounded-full bg-rose-500/20 text-rose-400 mt-0.5">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </div>
      <div class="flex-1">
        <h5 class="font-bold text-rose-300">Pengujian Belum Memenuhi Kriteria</h5>
        <p class="text-xs text-rose-200/90 mt-1">${validation.message}</p>
        <p class="text-[11px] text-rose-300/70 mt-1.5">Periksa petunjuk soal di panel kiri dan amati baris output terminal di panel kanan.</p>
      </div>
    `;
  }
}

function updateSubmitButtonStatus() {
  const btn = document.getElementById('btn-submit-sheet');
  if (!btn) return;

  const latihan = DATA_LATIHAN.find(l => l.id === state.selectedLatihanId);
  const isPassed = state.progress[latihan.id] && state.progress[latihan.id].passed;

  if (isPassed) {
    btn.className = "flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-emerald-900/40 transition pulse-glow ring-2 ring-emerald-400";
  } else {
    btn.className = "flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 transition";
  }
}

function appendTerminalLine(terminal, text, className) {
  const div = document.createElement('div');
  div.className = `terminal-line ${className}`;
  div.innerText = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal() {
  const terminal = document.getElementById('latihan-terminal');
  if (terminal) {
    terminal.innerHTML = '<div class="terminal-line terminal-system">Terminal simulator Python bengkel TSM siap. Tekan "Jalankan Python" (Ctrl+Enter) atau "Uji Jawaban".</div>';
  }
}

function clearMateriTerminal() {
  const terminal = document.getElementById('materi-terminal');
  if (terminal) {
    terminal.innerHTML = '<div class="terminal-line terminal-system">Konsol contoh kode Python. Tekan tombol "Coba Jalankan" di atas.</div>';
  }
}

// ==========================================
// 5. PENGIRIMAN DATA KE GOOGLE SHEET
// ==========================================
async function submitToGoogleSheet() {
  // 1. Cek Identitas Siswa
  if (!state.studentProfile.nama || !state.studentProfile.kelas) {
    alert("Silakan lengkapi Identitas Siswa (Nama dan Kelas TSM) terlebih dahulu sebelum mengirim tugas!");
    openProfileModal();
    return;
  }

  // 2. Cek URL Google Apps Script
  const scriptUrl = APP_CONFIG.getGoogleScriptUrl();
  if (!scriptUrl) {
    alert("URL Google Spreadsheet belum dikonfigurasi oleh Guru Pengampu!\nSilakan laporkan kepada guru pengampu Anda untuk memasukkan URL Spreadsheet melalui Menu Guru.");
    return;
  }

  const latihan = DATA_LATIHAN.find(l => l.id === state.selectedLatihanId);
  const editor = document.getElementById('code-editor');
  const codeContent = editor.value;
  const isPassed = state.progress[latihan.id] && state.progress[latihan.id].passed;

  // Siapkan Payload data sesuai format Google Spreadsheet
  const payload = {
    namaSiswa: state.studentProfile.nama,
    kelas: state.studentProfile.kelas,
    noAbsen: state.studentProfile.noAbsen || "-",
    nisn: state.studentProfile.nisn || "-",
    latihanId: latihan.nomor,
    latihanJudul: latihan.judul,
    status: isPassed ? "Lolos Uji" : "Terkirim (Perlu Review)",
    skor: isPassed ? 100 : 70,
    kodeSiswa: codeContent,
    outputLog: document.getElementById('latihan-terminal').innerText
  };

  const btnSubmit = document.getElementById('btn-submit-sheet');
  const originalHtml = btnSubmit.innerHTML;
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    Mengirim ke Google Sheet Guru...
  `;

  try {
    // Mode 'no-cors' agar request lolos dari kebijakan browser saat berinteraksi dengan Google Apps Script Web App
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    // Catat ke riwayat lokal
    const now = new Date();
    const formattedTime = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    const record = {
      id: Date.now(),
      waktu: formattedTime,
      latihanId: latihan.nomor,
      latihanJudul: latihan.judul,
      nama: payload.namaSiswa,
      kelas: payload.kelas,
      skor: payload.skor,
      status: payload.status
    };

    saveSubmissionRecord(record);

    // Tandai status latihan sebagai submitted
    if (!state.progress[latihan.id]) {
      state.progress[latihan.id] = {};
    }
    state.progress[latihan.id].submitted = true;
    state.progress[latihan.id].lastSubmitted = record.waktu;
    saveProgress();

    showNotificationModal("Pengiriman Berhasil! 🎉", `
      <div class="space-y-3">
        <p class="text-sm text-slate-300">Hasil latihan <strong>${latihan.nomor}: ${latihan.judul}</strong> atas nama <strong>${payload.namaSiswa} (${payload.kelas})</strong> berhasil tercatat di Google Sheet Guru!</p>
        <div class="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-400 border border-slate-800 space-y-1">
          <div>Status : <span class="text-white">${payload.status}</span></div>
          <div>Skor   : <span class="text-white font-bold">${payload.skor} / 100</span></div>
          <div>Waktu  : <span class="text-white">${record.waktu} WIB</span></div>
        </div>
        <p class="text-xs text-slate-400">Guru pengampu dapat langsung melihat kode dan output kamu pada lembar rekap nilai spreadsheet.</p>
      </div>
    `);

  } catch (error) {
    console.error("Gagal mengirim ke Google Sheet:", error);
    alert(`Terjadi kendala saat mengirim data: ${error.message}\nPastikan komputer/laptop terhubung ke internet dan URL Google Script sudah benar.`);
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = originalHtml;
  }
}

// ==========================================
// 6. MODAL & DIALOG PENGATURAN
// ==========================================
function openProfileModal() {
  populateClassOptions();
  document.getElementById('input-nama-siswa').value = state.studentProfile.nama || '';
  document.getElementById('input-kelas-siswa').value = state.studentProfile.kelas || (APP_CONFIG.daftarKelas ? APP_CONFIG.daftarKelas[0] : 'TSM I');
  document.getElementById('input-absen-siswa').value = state.studentProfile.noAbsen || '';
  document.getElementById('input-nisn-siswa').value = state.studentProfile.nisn || '';

  document.getElementById('modal-profile').classList.remove('hidden');
}

function closeProfileModal() {
  document.getElementById('modal-profile').classList.add('hidden');
}

function handleSaveProfile(e) {
  e.preventDefault();
  const nama = document.getElementById('input-nama-siswa').value.trim();
  const kelas = document.getElementById('input-kelas-siswa').value.trim();
  const absen = document.getElementById('input-absen-siswa').value.trim();
  const nisn = document.getElementById('input-nisn-siswa').value.trim();

  if (!nama || !kelas) {
    alert("Nama lengkap dan Jurusan / Kelas TSM wajib diisi!");
    return;
  }

  state.studentProfile = { nama, kelas, noAbsen: absen, nisn };
  saveStudentProfile();
  closeProfileModal();
}

// ------------------------------------------
// AUTENTIKASI DAN MODAL MENU GURU
// ------------------------------------------
function openGuruModal() {
  // Cek apakah sesi guru sudah terverifikasi dengan password
  if (state.isGuruAuthenticated || sessionStorage.getItem('kodingtsm_guru_auth') === 'true') {
    state.isGuruAuthenticated = true;
    showGuruSettingsModal();
  } else {
    openGuruAuthModal();
  }
}

function openGuruAuthModal() {
  const modalAuth = document.getElementById('modal-guru-auth');
  if (!modalAuth) return;

  const errBox = document.getElementById('guru-auth-error');
  if (errBox) errBox.classList.add('hidden');

  const inputPass = document.getElementById('input-guru-password');
  if (inputPass) {
    inputPass.value = '';
    inputPass.type = 'password';
  }

  const eyeClosed = document.getElementById('eye-icon-closed');
  const eyeOpen = document.getElementById('eye-icon-open');
  if (eyeClosed && eyeOpen) {
    eyeClosed.classList.remove('hidden');
    eyeOpen.classList.add('hidden');
  }

  modalAuth.classList.remove('hidden');
  setTimeout(() => { if (inputPass) inputPass.focus(); }, 100);
}

function closeGuruAuthModal() {
  const modalAuth = document.getElementById('modal-guru-auth');
  if (modalAuth) modalAuth.classList.add('hidden');
}

function toggleGuruPasswordVisibility() {
  const inputPass = document.getElementById('input-guru-password');
  const eyeClosed = document.getElementById('eye-icon-closed');
  const eyeOpen = document.getElementById('eye-icon-open');
  if (!inputPass) return;

  if (inputPass.type === 'password') {
    inputPass.type = 'text';
    if (eyeClosed) eyeClosed.classList.add('hidden');
    if (eyeOpen) eyeOpen.classList.remove('hidden');
  } else {
    inputPass.type = 'password';
    if (eyeClosed) eyeClosed.classList.remove('hidden');
    if (eyeOpen) eyeOpen.classList.add('hidden');
  }
}

function handleGuruAuthSubmit(e) {
  e.preventDefault();
  const inputPass = document.getElementById('input-guru-password').value;
  const errBox = document.getElementById('guru-auth-error');
  const errMsg = document.getElementById('guru-auth-error-msg');

  if (APP_CONFIG.verifyGuruPassword(inputPass)) {
    state.isGuruAuthenticated = true;
    sessionStorage.setItem('kodingtsm_guru_auth', 'true');
    closeGuruAuthModal();
    showGuruSettingsModal();
  } else {
    if (errBox) {
      if (errMsg) errMsg.innerText = "Password guru salah! Silakan coba lagi.";
      errBox.classList.remove('hidden');
    }
  }
}

function showGuruSettingsModal() {
  const currentUrl = APP_CONFIG.getGoogleScriptUrl();
  const urlInput = document.getElementById('input-google-script-url');
  if (urlInput) urlInput.value = currentUrl;

  const testBox = document.getElementById('test-connection-result');
  if (testBox) testBox.classList.add('hidden');

  const changeResult = document.getElementById('change-pass-result');
  if (changeResult) changeResult.classList.add('hidden');

  const newPassInput = document.getElementById('input-new-guru-password');
  const confirmPassInput = document.getElementById('input-confirm-guru-password');
  if (newPassInput) newPassInput.value = '';
  if (confirmPassInput) confirmPassInput.value = '';

  document.getElementById('modal-guru').classList.remove('hidden');
}

function closeGuruModal() {
  document.getElementById('modal-guru').classList.add('hidden');
}

function lockGuruSession() {
  state.isGuruAuthenticated = false;
  sessionStorage.removeItem('kodingtsm_guru_auth');
  closeGuruModal();
  alert("Sesi guru telah dikunci! Untuk mengakses kembali Menu Guru, Anda harus memasukkan password.");
}

function handleChangeGuruPassword(e) {
  e.preventDefault();
  const newPass = document.getElementById('input-new-guru-password').value.trim();
  const confirmPass = document.getElementById('input-confirm-guru-password').value.trim();
  const resultBox = document.getElementById('change-pass-result');

  if (!resultBox) return;

  if (newPass.length < 4) {
    resultBox.className = "text-[11px] p-2 rounded bg-rose-950/70 border border-rose-800 text-rose-300";
    resultBox.innerText = "Password baru terlalu pendek (minimal 4 karakter).";
    resultBox.classList.remove('hidden');
    return;
  }

  if (newPass !== confirmPass) {
    resultBox.className = "text-[11px] p-2 rounded bg-rose-950/70 border border-rose-800 text-rose-300";
    resultBox.innerText = "Konfirmasi password tidak cocok!";
    resultBox.classList.remove('hidden');
    return;
  }

  APP_CONFIG.setGuruPassword(newPass);
  resultBox.className = "text-[11px] p-2 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-300 font-semibold";
  resultBox.innerText = "Password guru berhasil diubah! Gunakan password baru ini saat masuk berikutnya.";
  resultBox.classList.remove('hidden');

  document.getElementById('input-new-guru-password').value = '';
  document.getElementById('input-confirm-guru-password').value = '';
}

function handleSaveGuruSettings(e) {
  e.preventDefault();
  const url = document.getElementById('input-google-script-url').value.trim();
  APP_CONFIG.setGoogleScriptUrl(url);
  checkScriptUrlStatus();
  closeGuruModal();
  alert("Pengaturan URL Google Sheet berhasil disimpan!");
}

async function testSheetConnection() {
  const url = document.getElementById('input-google-script-url').value.trim();
  const resultBox = document.getElementById('test-connection-result');
  if (!resultBox) return;

  if (!url || url.length < 15) {
    resultBox.className = "p-3 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-300 text-xs";
    resultBox.innerText = "Masukkan URL Google Apps Script yang valid terlebih dahulu!";
    resultBox.classList.remove('hidden');
    return;
  }

  resultBox.className = "p-3 rounded-lg bg-amber-950/70 border border-amber-800 text-amber-300 text-xs flex items-center gap-2";
  resultBox.innerHTML = `
    <svg class="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
    Menguji koneksi ke Google Sheet...
  `;
  resultBox.classList.remove('hidden');

  try {
    // Uji kirim payload dummy
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        namaSiswa: "[TES KONEKSI GURU]",
        kelas: "X TSM",
        noAbsen: "00",
        nisn: "-",
        latihanId: "TES-00",
        latihanJudul: "Uji Sambungan Web App",
        status: "Koneksi Berhasil",
        skor: 100,
        kodeSiswa: "# Tes koneksi dari aplikasi KodingTSM",
        outputLog: "OK"
      })
    });

    resultBox.className = "p-3 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs";
    resultBox.innerHTML = "✔ <strong>Koneksi Berhasil!</strong> Web App merespons dan data uji coba telah dikirimkan ke Google Sheet Anda.";
  } catch (err) {
    resultBox.className = "p-3 rounded-lg bg-rose-950/80 border border-rose-700 text-rose-300 text-xs";
    resultBox.innerHTML = `❌ <strong>Gagal Terhubung:</strong> ${err.message}. Pastikan izin deployment disetel ke 'Anyone' (Siapa saja).`;
  }
}

function copyAppsScriptCode() {
  const scriptCode = `// Google Apps Script Penerima Hasil Latihan Siswa KodingTSM SMKN 1 Pleret
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    if (sheet.getName() === "Sheet1" || sheet.getName() === "Halaman1") {
      sheet.setName("Rekap_Nilai_TSM");
    }
    if (sheet.getLastRow() === 0) {
      var headers = ["Waktu Pengiriman","Nama Siswa","Kelas","No. Absen","NISN","ID Latihan","Judul Latihan","Status Uji","Nilai Skor","Kode Python Siswa","Output Terminal"];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
    var data = {};
    if (e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch(err) { data = e.parameter; }
    } else { data = e.parameter || {}; }
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
    return ContentService.createTextOutput(JSON.stringify({status: "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", error: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  navigator.clipboard.writeText(scriptCode).then(() => {
    alert("Kode Google Apps Script berhasil disalin! Buka menu Ekstensi > Apps Script di Google Sheet dan tempelkan kodenya.");
  }).catch(err => {
    console.error("Gagal menyalin kode:", err);
  });
}

function openHistoryModal() {
  renderSubmissionHistory();
  document.getElementById('modal-history').classList.remove('hidden');
}

function closeHistoryModal() {
  document.getElementById('modal-history').classList.add('hidden');
}

function renderSubmissionHistory() {
  const container = document.getElementById('history-table-body');
  if (!container) return;
  container.innerHTML = '';

  if (state.history.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-6 text-slate-500 text-sm">Belum ada riwayat pengiriman latihan koding.</td>
      </tr>
    `;
    return;
  }

  state.history.forEach((h) => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-800 text-xs text-slate-300 hover:bg-slate-850';
    tr.innerHTML = `
      <td class="py-2.5 px-3 font-mono text-slate-400">${h.waktu}</td>
      <td class="py-2.5 px-3 font-medium text-white">${h.latihanJudul}</td>
      <td class="py-2.5 px-3">${h.nama} (${h.kelas})</td>
      <td class="py-2.5 px-3 font-semibold text-emerald-400">${h.skor}</td>
      <td class="py-2.5 px-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          ${h.status}
        </span>
      </td>
    `;
    container.appendChild(tr);
  });
}

// Modal Kamus Python TSM
function openKamusModal() {
  const container = document.getElementById('kamus-container');
  if (container) {
    container.innerHTML = '';
    KAMUS_PYTHON_TSM.forEach(k => {
      const card = document.createElement('div');
      card.className = "p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs";
      card.innerHTML = `
        <div class="flex items-center justify-between font-mono font-bold text-amber-400 text-sm mb-1">
          <code>${k.perintah}</code>
        </div>
        <p class="text-slate-300 mb-2">${k.fungsi}</p>
        <div class="bg-slate-950 p-2 rounded text-slate-400 font-mono text-[11px] whitespace-pre">${k.contoh}</div>
      `;
      container.appendChild(card);
    });
  }
  document.getElementById('modal-kamus').classList.remove('hidden');
}

function closeKamusModal() {
  document.getElementById('modal-kamus').classList.add('hidden');
}

// Fitur Ekspor Data ke CSV (Offline Backup untuk Guru)
function exportToCSV() {
  if (state.history.length === 0) {
    alert("Belum ada riwayat pengiriman untuk diekspor!");
    return;
  }

  const headers = ["Waktu Pengiriman", "Latihan", "Nama Siswa", "Kelas", "Nilai Skor", "Status"];
  const rows = state.history.map(h => [
    `"${h.waktu}"`,
    `"${h.latihanJudul}"`,
    `"${h.nama}"`,
    `"${h.kelas}"`,
    h.skor,
    `"${h.status}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Rekap_Nilai_KodingTSM_${state.studentProfile.nama || 'Siswa'}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showNotificationModal(title, contentHtml) {
  const modal = document.getElementById('modal-notification');
  document.getElementById('notif-title').innerText = title;
  document.getElementById('notif-content').innerHTML = contentHtml;
  modal.classList.remove('hidden');
}

function closeNotificationModal() {
  document.getElementById('modal-notification').classList.add('hidden');
}
