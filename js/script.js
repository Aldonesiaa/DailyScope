let berita = JSON.parse(localStorage.getItem("beritaList") || "[]");
let editIndex = -1;

// ========== Inisialisasi Tema ==========
const tema = localStorage.getItem("tema") || "terang";
const warnaUtama = localStorage.getItem("warnaUtama") || "#4CAF50";
aturTema(tema);
document.documentElement.style.setProperty("--warna-utama", warnaUtama);

// Simpan riwayat login
function simpanRiwayatLogin() {
  const data = JSON.parse(localStorage.getItem("riwayatLogin") || "[]");
  const waktu = new Date().toLocaleString("id-ID");
  data.push({ waktu });
  localStorage.setItem("riwayatLogin", JSON.stringify(data));
}
simpanRiwayatLogin();

// =================== Tampilan ===================
function tampilkanHalaman(halaman) {
  const konten = document.getElementById("konten");

  if (halaman === "riwayat") {
    const data = JSON.parse(localStorage.getItem("riwayatLogin") || "[]");
    let cards = data.map(
      (r, i) => `
      <div class="riwayat-card">
        <h3>Login ke-${i + 1}</h3>
        <p>${r.waktu}</p>
        <button class="btn btn-danger" onclick="hapusRiwayat(${i})">Hapus</button>
      </div>`
    ).join("");
    if (!cards) cards = `<p>Belum ada riwayat login.</p>`;
    konten.innerHTML = `
      <h1>Riwayat Login</h1>
      <button class="btn btn-danger" onclick="hapusSemuaRiwayat()">Hapus Semua</button>
      <div style="margin-top:15px;">
        ${cards}
      </div>`;
  }

  else if (halaman === "dashboard") {
    let beritaTerkini = berita.length
      ? berita.map(b => `
          <div class="riwayat-card">
            <h3>${b.judul}</h3>
            <p><b>Jenis:</b> ${b.jenis}</p>
            <p><b>Penulis:</b> ${b.penulis || "Tidak diketahui"}</p>
            <p>${b.isi}</p>
          </div>`).join("")
      : "<p>Belum ada berita yang ditambahkan.</p>";

    konten.innerHTML = `
      <h1>Dashboard</h1>
      <div class="dashboard-cards">
        <div class="card"><h3>Total Berita</h3><p>${berita.length}</p></div>
        <div class="card"><h3>Riwayat Login</h3><p>${(JSON.parse(localStorage.getItem("riwayatLogin") || "[]")).length}</p></div>
        <div class="card"><h3>Admin Aktif</h3><p>1</p></div>
      </div>
      <h2>📰 Berita Terbaru</h2>
      <div class="berita-terkini">${beritaTerkini}</div>`;
  }

  else if (halaman === "berita") {
    konten.innerHTML = `
      <div class="crud-container">
        <div class="crud-header">
          <h2>Manajemen Berita</h2>
          <button class="btn" onclick="tampilFormBerita()">+ Tambah Berita</button>
        </div>
        <table id="tabelBerita">
          <thead>
            <tr><th>Judul</th><th>Jenis</th><th>Isi</th><th>Penulis</th><th>Aksi</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>`;
    tampilkanTabel();
  }

  else if (halaman === "profil") {
    konten.innerHTML = `
      <h1>Profil Pengguna</h1>
      <p>Nama: Admin</p>
      <p>Email: admin@dailyscope.id</p>`;
  }

  else if (halaman === "pengaturan") {
    konten.innerHTML = `
      <h1>Pengaturan</h1>
      <div class="setting-item">
        <label for="tema">Tema Tampilan</label>
        <select id="tema" onchange="gantiTema(this.value)">
          <option value="terang" ${tema === "terang" ? "selected" : ""}>Terang</option>
          <option value="gelap" ${tema === "gelap" ? "selected" : ""}>Gelap</option>
        </select>
      </div>
      <div class="setting-item">
        <label for="warnaUtama">Warna Utama</label>
        <input type="color" id="warnaUtama" value="${warnaUtama}" onchange="gantiWarna(this.value)">
      </div>`;
  }
}

// =================== CRUD BERITA ===================
function tampilkanTabel() {
  const tbody = document.querySelector("#tabelBerita tbody");
  if (!tbody) return;
  tbody.innerHTML = berita.map((b, i) => `
    <tr>
      <td>${b.judul}</td>
      <td>${b.jenis}</td>
      <td>${b.isi}</td>
      <td>${b.penulis || "Tidak diketahui"}</td>
      <td>
        <button class="btn" onclick="editBerita(${i})">Edit</button>
        <button class="btn btn-danger" onclick="hapusBerita(${i})">Hapus</button>
      </td>
    </tr>`).join("");
}

function tampilFormBerita() {
  document.getElementById("formBerita").style.display = "block";
  document.getElementById("judulPopup").innerText = "Tambah Berita";
  document.getElementById("judul").value = "";
  document.getElementById("jenis").value = "";
  document.getElementById("isi").value = "";
  editIndex = -1;
}

function tutupFormBerita() {
  document.getElementById("formBerita").style.display = "none";
}

function simpanBerita() {
  const judul = document.getElementById("judul").value.trim();
  const jenis = document.getElementById("jenis").value.trim();
  const isi = document.getElementById("isi").value.trim();

  if (!judul || !jenis || !isi) {
    alert("⚠️ Harap isi semua kolom sebelum menyimpan!");
    return;
  }

  alert("📄 Berita sedang diproses...");
  const konfirmasi = confirm("Apakah kamu yakin ingin menyimpan berita ini?");
  if (!konfirmasi) {
    alert("❌ Penyimpanan dibatalkan oleh pengguna.");
    return;
  }

  const penulis = prompt("Masukkan nama penulis berita:", "Admin DailyScope");
  if (!penulis) {
    alert("⚠️ Nama penulis dibutuhkan untuk menyimpan berita!");
    return;
  }

  if (editIndex === -1) berita.push({ judul, jenis, isi, penulis });
  else berita[editIndex] = { judul, jenis, isi, penulis };

  localStorage.setItem("beritaList", JSON.stringify(berita));
  tutupFormBerita();
  tampilkanTabel();

  if (document.getElementById("konten").innerHTML.includes("Dashboard")) tampilkanHalaman("dashboard");

  showToast(`✅ Berita "${judul}" berhasil disimpan oleh ${penulis}!`, "success");
}

function hapusBerita(index) {
  if (confirm("Yakin ingin menghapus berita ini?")) {
    berita.splice(index, 1);
    localStorage.setItem("beritaList", JSON.stringify(berita));
    tampilkanTabel();
    if (document.getElementById("konten").innerHTML.includes("Dashboard")) tampilkanHalaman("dashboard");
    showToast("✅ Berita berhasil dihapus.", "success");
  }
}

// =================== TOAST ===================
function showToast(pesan, tipe = "success") {
  let toast = document.createElement("div");
  toast.className = "toast show";
  toast.innerHTML = `
    <div class="toast-icon">${tipe === "success" ? "✔️" : "❌"}</div>
    <div class="toast-message">${pesan}</div>
    <div class="toast-bar"></div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// =================== Tema & Logout ===================
function gantiTema(mode) {
  localStorage.setItem("tema", mode);
  aturTema(mode);
}

function aturTema(mode) {
  if (mode === "gelap") {
    document.documentElement.style.setProperty("--bg-color", "#121212");
    document.documentElement.style.setProperty("--text-color", "#f5f5f5");
  } else {
    document.documentElement.style.setProperty("--bg-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "#333");
  }
}

function gantiWarna(warna) {
  document.documentElement.style.setProperty("--warna-utama", warna);
  localStorage.setItem("warnaUtama", warna);
}

function logout() {
  if (confirm("Yakin ingin logout?")) window.location.href = "login.html";
}

window.addEventListener("DOMContentLoaded", () => {
  berita = JSON.parse(localStorage.getItem("beritaList") || "[]");
});

function editBerita(index) {
  // Ambil data berita berdasarkan index
  const b = berita[index];

  // Tampilkan form popup
  document.getElementById("formBerita").style.display = "block";
  document.getElementById("judulPopup").innerText = "Edit Berita";

  // Isi form dengan data lama
  document.getElementById("judul").value = b.judul;
  document.getElementById("jenis").value = b.jenis;
  document.getElementById("isi").value = b.isi;

  // Simpan index berita yang sedang diedit
  editIndex = index;

  // Notifikasi kecil
  showToast(`✏️ Sedang mengedit berita "${b.judul}"`, "success");
}
