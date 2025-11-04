// === FORM REGISTER ===
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const birthday = document.getElementById('birthday').value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!firstName || !lastName || !birthday || !gender || !email || !password) {
    alert('Harap isi semua data dengan lengkap!');
    return;
  }

  // Ambil data users yang sudah ada
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Cek apakah email sudah terdaftar
  const existing = users.find(u => u.email === email);
  if (existing) {
    alert('Email sudah terdaftar! Silakan login.');
    window.location.href = 'login.html';
    return;
  }

  // Simpan akun baru
  const user = { firstName, lastName, birthday, gender: gender.value, email, password, role: "user" };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  // Simpan info untuk login otomatis nanti
  localStorage.setItem('lastRegisteredEmail', email);

  // Langsung pindah ke halaman login
  window.location.href = 'login.html';
});

// === MODE GELAP / TERANG ===
const toggleBtn = document.getElementById('modeToggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️ Mode Terang';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleBtn.textContent = '🌙 Mode Gelap';
    localStorage.setItem('theme', 'light');
  }
});

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggleBtn.textContent = '☀️ Mode Terang';
}
