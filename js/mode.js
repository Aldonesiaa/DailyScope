const toggleModeBtn = document.querySelector('.mode-toggle');
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Simpan mode ke localStorage agar tetap diingat
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('mode', 'dark');
  } else {
    localStorage.setItem('mode', 'light');
  }
});

// Saat halaman di-load, cek mode terakhir
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('mode');
  if (savedMode === 'dark') {
    document.body.classList.add('dark-mode');
  }
});
