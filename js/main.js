// ====== MAIN.JS DAILY SCOPE ======

// Ambil elemen penting
const form = document.getElementById("formBerita");
const container = document.getElementById("listBerita");
const toast = document.getElementById("toast");
const totalBeritaElement = document.getElementById("totalBerita");
const toggleModeBtn = document.querySelector(".mode-toggle");

// ========================
// === FITUR TAMBAH BERITA ===
// ========================

// Saat halaman dimuat, tampilkan berita yang tersimpan
document.addEventListener("DOMContentLoaded", () => {
  const beritaList = JSON.parse(localStorage.getItem("beritaList") || "[]");
  beritaList.forEach((berita) => tambahBeritaKeDOM(berita));
  updateTotalBerita(beritaList.length);

  // Mode gelap disimpan agar tetap aktif
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Saat form disubmit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const judul = document.getElementById("judul").value.trim();
  const kategori = document.getElementById("kategori").value.trim();
  const isi = document.getElementById("isi").value.trim();

  if (!judul || !kategori || !isi) {
    showToast("⚠️ Semua field wajib diisi!");
    return;
  }

  const beritaBaru = { judul, kategori, isi };

  // Simpan ke localStorage
  const beritaList = JSON.parse(localStorage.getItem("beritaList") || "[]");
  beritaList.push(beritaBaru);
  localStorage.setItem("beritaList", JSON.stringify(beritaList));

  // Tampilkan di halaman
  tambahBeritaKeDOM(beritaBaru);
  updateTotalBerita(beritaList.length);
  form.reset();
  showToast("✅ Berita berhasil ditambahkan!");
});

// Fungsi menambah berita ke tampilan
function tambahBeritaKeDOM(berita) {
  const card = document.createElement("div");
  card.classList.add("news-card");
  card.innerHTML = `
    <div class="news-card-content">
      <h3>${berita.judul}</h3>
      <p><strong>Kategori:</strong> ${berita.kategori}</p>
      <p>${berita.isi}</p>
    </div>
  `;
  container.appendChild(card);
}

// Fungsi update total berita
function updateTotalBerita(jumlah) {
  if (totalBeritaElement) {
    totalBeritaElement.textContent = jumlah;
  }
}

// Fungsi menampilkan notifikasi kecil (toast)
function showToast(pesan) {
  toast.textContent = pesan;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ========================
// === FITUR DARK MODE ===
// ========================

if (toggleModeBtn) {
  toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("mode", mode);
  });
}

// ========================
// === GRAFIK DASHBOARD ===
// ========================

if (document.getElementById("grafikAktivitas")) {
  const ctx = document.getElementById("grafikAktivitas").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
      datasets: [
        {
          label: "Aktivitas Berita",
          data: [0, 1, 2, 1, 3, 2],
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });
}
