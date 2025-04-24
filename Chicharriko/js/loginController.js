document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email_login");
  const passwordInput = document.getElementById("password_login");
  const messageContainer = document.getElementById("loginMessages");

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
      const response = await fetch("http://localhost:3002/users");
      if (!response.ok) throw new Error("Error al conectar con el servidor");
      const users = await response.json();

      const foundUser = users.find(user => user.email === email && user.password === password);

      if (foundUser) {
        sessionStorage.setItem("currentUser", JSON.stringify({
          id: foundUser.id,
          nombre: foundUser.nombre,
          email: foundUser.email
        }));
        showMessage("¡Inicio de sesión exitoso! Redirigiendo...", "success");
        setTimeout(() => {
          window.location.href = "../html/index.html";
        }, 3000);
        return true;
      } else {
        showMessage("Email o contraseña incorrectos", "danger");
        return false;
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      showMessage(`Error: ${error.message}. Usando autenticación local.`, "warning");

      const usersLocal = [
        { id: "1", nombre: "Denisse Hernández", email: "denissehernandez2002@gmail.com", password: "1234567" },
        { id: "2", nombre: "Aylen Vázquez", email: "denissehernandez2002@gmail.com", password: "lkmmlmlkmlkml" },
        { id: "3", nombre: "Aylen Vázquez", email: "denissehernandez2002@gmail.com", password: "sjnsdkjsdshkhsjkd" },
        { id: "4", nombre: "daniela", email: "dany.rodgarcia@gmail.com", password: "999999" }
      ];

      const localUser = usersLocal.find(user => user.email === email && user.password === password);

      if (localUser) {
        sessionStorage.setItem("currentUser", JSON.stringify({
          id: localUser.id,
          nombre: localUser.nombre,
          email: localUser.email
        }));
        showMessage("¡Inicio de sesión exitoso con autenticación local! Redirigiendo...", "success");
        setTimeout(() => {
          window.location.href = "../html/index.html";
        }, 3000);
        return true;
      } else {
        showMessage("Email o contraseña incorrectos", "danger");
        return false;
      }
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