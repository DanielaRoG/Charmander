document.addEventListener("DOMContentLoaded", function () {
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
      const response = await fetch(
        "http://localhost:8080/api/Chicharrikos/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo: email, contraseña: password }),
        }
      );

      if (!response.ok) {
        try {
          const errorBody = await response.json();
          showMessage(
            `Error al iniciar sesión: ${
              errorBody.mensaje || "Credenciales inválidas"
            }`,
            "danger"
          );
        } catch (e) {
          showMessage(
            `Error al iniciar sesión: Credenciales inválidas`,
            "danger"
          );
          console.error("Error al parsear error JSON:", e);
        }
        return false;
      }

      try {
        const data = await response.json();
        showMessage(data.mensaje || "Inicio de sesión exitoso", "success"); // Asume que la respuesta JSON tiene un campo "mensaje"
        setTimeout(() => {
          window.location.href = "../html/index.html"; // Redirige a la página principal
        }, 2000);
        return true;
      } catch (e) {
        showMessage("Error al procesar la respuesta del servidor", "danger");
        console.error("Error al parsear JSON de éxito:", e);
        return false;
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      showMessage(`Error al conectar con el servidor: ${error}`, "danger");
      return false;
    }
  }

  emailInput.addEventListener("input", () => {
    if (
      emailInput.classList.contains("is-invalid") &&
      emailInput.value.trim()
    ) {
      emailInput.classList.remove("is-invalid");
    }
  });

  passwordInput.addEventListener("input", () => {
    if (
      passwordInput.classList.contains("is-invalid") &&
      passwordInput.value.trim()
    ) {
      passwordInput.classList.remove("is-invalid");
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (validateFields()) {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      await authenticateUser(email, password);
    }
  });

  // Opcional: verificar si ya hay usuario logueado (tendrás que adaptar esto si implementas sesiones en el backend)
  function checkLoggedInStatus() {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      showMessage(`Ya has iniciado sesión como ${user.nombre}.`, "info");
      // setTimeout(() => {
      //     window.location.href = "../html/index.html";
      // }, 3000);
    }
  }

  checkLoggedInStatus();
});
