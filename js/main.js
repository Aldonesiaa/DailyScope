document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the login data to a server
      // For this example, we'll just redirect to the admin page
      window.location.href = "admin.html";
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the registration data to a server
      // For this example, we'll just redirect to the login page
      window.location.href = "login.html";
    });
  }
});
