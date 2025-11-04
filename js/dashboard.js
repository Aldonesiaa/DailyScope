// 🌙 Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

window.onload = function() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
};

// 🧩 Edit Profil
function editProfile(event) {
  event.preventDefault();
  const editForm = document.getElementById('editForm');
  editForm.classList.toggle('active');
}

// 💾 Simpan Profil
function saveProfile() {
  const newName = document.getElementById('editName').value;
  const newEmail = document.getElementById('editEmail').value;
  if (newName && newEmail) {
    document.querySelector('.profile-info p:nth-child(1)').textContent = `Nama: ${newName}`;
    document.querySelector('.profile-info p:nth-child(2)').textContent = `Email: ${newEmail}`;
    alert('Profil berhasil diperbarui!');
    editProfile({ preventDefault: () => {} });
  } else {
    alert('Mohon isi semua field!');
  }
}

// 🔔 Notifikasi
function showNotification() {
  alert('Anda memiliki 2 notifikasi baru!');
}

// 🚪 Logout Popup Logic
const logoutButton = document.querySelector(".logout-btn");
logoutButton.onclick = function() {
  document.getElementById("confirmLogoutPopup").style.display = "flex";
};

// Tombol Tidak
document.getElementById("confirmNo").addEventListener("click", function() {
  document.getElementById("confirmLogoutPopup").style.display = "none";
});

// Tombol Iya → tampilkan Logout Berhasil
document.getElementById("confirmYes").addEventListener("click", function() {
  document.getElementById("confirmLogoutPopup").style.display = "none";
  setTimeout(() => {
    document.getElementById("logoutPopup").style.display = "flex";
  }, 300);
});

// Tombol Lanjut ke Halaman Login
document.getElementById("closeLogoutPopup").addEventListener("click", function() {
  window.location.href = "login-landing.html";
});
