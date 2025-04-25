document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email_login");
  const passwordInput = document.getElementById("password_login");
  const messageContainer = document.getElementById("loginMessages");
  // URL base para tu backend Spring Boot
  const API_URL_BASE = "http://localhost:8080/api/Chicharrikos/cliente";

  function showMessage(message, type) {
    messageContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  function validateFields() {
    messageContainer.innerHTML = "";
    let isValid = true;

    if (!emailInput.value.trim()) {
      emailInput.classList.add("is-invalid");
      isValid = false;
    } else {
      emailInput.classList.remove("is-invalid");
    }

    if (!passwordInput.value.trim()) {
      passwordInput.classList.add("is-invalid");
      isValid = false;
    } else {
      passwordInput.classList.remove("is-invalid");
    }

    if (!isValid) {
      showMessage("Por favor completa todos los campos", "danger");
    }

    return isValid;
  }

  async function authenticateUser(email, password) {
    try {
      // Opción 1: Usar POST con un endpoint fijo y enviar email/password en el cuerpo
      const url = `${API_URL_BASE}/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error de autenticación: ${response.status} - ${errorText}`);
      }

      // Si la autenticación es exitosa, obtenemos los datos del usuario desde la respuesta
      const userData = await response.json();
      sessionStorage.setItem("currentUser", JSON.stringify({
        id: userData.id,
        nombre: userData.nombre || userData.username,
        email: userData.email,
        token: userData.token // Guardamos el token si el backend lo devuelve
      }));
      showMessage("¡Inicio de sesión exitoso! Redirigiendo...", "success");
      setTimeout(() => {
        window.location.href = "../html/index.html";
      }, 3000);
      return true;
    } catch (error) {
      console.error("Error de autenticación:", error);
      showMessage("Email o contraseña incorrectos. Por favor, intenta de nuevo.", "danger");
      return false;
    }
  }

  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("is-invalid") && emailInput.value.trim()) {
      emailInput.classList.remove("is-invalid");
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.classList.contains("is-invalid") && passwordInput.value.trim()) {
      passwordInput.classList.remove("is-invalid");
    }
  });

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    if (validateFields()) {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      await authenticateUser(email, password);
    }
  });

  // Opcional: verificar si ya hay usuario logueado
  function checkLoggedInStatus() {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      showMessage(`Ya has iniciado sesión como ${user.nombre}.`, "info");
      /*setTimeout(() => {
        window.location.href = "../html/index.html";
      }, 3000);*/
    }
  }

  checkLoggedInStatus();
});