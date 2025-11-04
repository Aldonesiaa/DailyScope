// Elemen penting
const form = document.getElementById("formBerita");
const container = document.getElementById("listBerita");
const totalBeritaElement = document.getElementById("totalBerita");

// Saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  const beritaList = JSON.parse(localStorage.getItem("beritaList") || "[]");
  beritaList.forEach(berita => tambahBeritaKeDOM(berita));
  updateTotalBerita(beritaList.length);
});

// Tombol tambah berita
function tambahBeritaBaru() {
  showPopupInput(
    "📰 Tambah Berita Baru",
    "Masukkan judul berita...",
    "Masukkan isi berita...",
    (judul, isi) => {
      if (!judul || !isi) {
        showPopupInfo("⚠️ Semua kolom harus diisi sebelum menyimpan!");
        return;
      }

      const kategori = "Umum"; // default kategori
      const beritaBaru = { judul, kategori, isi };

      const beritaList = JSON.parse(localStorage.getItem("beritaList") || "[]");
      beritaList.push(beritaBaru);
      localStorage.setItem("beritaList", JSON.stringify(beritaList));

      tambahBeritaKeDOM(beritaBaru);
      updateTotalBerita(beritaList.length);

      showPopupInfo(`✅ Berita berhasil disimpan!\n\nJudul: ${judul}`);
    }
  );
}

// Tambah berita ke halaman
function tambahBeritaKeDOM(berita) {
  const card = document.createElement("div");
  card.classList.add("news-card");
  card.innerHTML = `
    <div class="news-card-content">
      <h3>${berita.judul}</h3>
      <p><strong>Jenis:</strong> ${berita.kategori}</p>
      <p>${berita.isi}</p>
    </div>
  `;
  container.appendChild(card);
}

// Update total berita
function updateTotalBerita(jumlah) {
  if (totalBeritaElement) totalBeritaElement.textContent = jumlah;
}

// 🔹 PopUp input box (2 field)
function showPopupInput(title, placeholder1, placeholder2, callback) {
  const popup = document.getElementById("popupInput");
  const input1 = document.getElementById("popupInput1");
  const input2 = document.getElementById("popupInput2");
  const popupTitle = document.getElementById("popupTitle");

  popup.style.display = "flex";
  popupTitle.textContent = title;
  input1.placeholder = placeholder1;
  input2.placeholder = placeholder2;
  input1.value = "";
  input2.value = "";

  document.getElementById("popupOk").onclick = function() {
    const val1 = input1.value.trim();
    const val2 = input2.value.trim();
    popup.style.display = "none";
    callback(val1, val2);
  };

  document.getElementById("popupCancel").onclick = function() {
    popup.style.display = "none";
  };
}

// 🔹 PopUp info (tanpa input)
function showPopupInfo(pesan) {
  const popup = document.getElementById("popupInfo");
  const text = document.getElementById("popupInfoText");
  popup.style.display = "flex";
  text.textContent = pesan;

  document.getElementById("popupInfoOk").onclick = function() {
    popup.style.display = "none";
  };
}
