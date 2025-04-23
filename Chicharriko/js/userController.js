document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  const nombreInput = document.getElementById("nombreUsuario");
  const telefonoInput = document.getElementById("telefonoUsuario");
  const direccionInput = document.getElementById("direccionUsuario");
  const emailInput = document.getElementById("emailUsuario");
  const passwordInput = document.getElementById("passwordUsuario");
  const passwordValidarInput = document.getElementById("passwordUsuarioValidar");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const togglePasswordValidarBtn = document.getElementById("togglePasswordValidar");

  // Función para alternar la visibilidad de la contraseña
  function togglePasswordVisibility(input, button) {
    if (input.type === "password") {
      input.type = "text";
      button.innerHTML = "🫣";
    } else {
      input.type = "password";
      button.innerHTML = "👀";
    }
  }

  togglePasswordBtn.addEventListener("click", function () {
    togglePasswordVisibility(passwordInput, togglePasswordBtn);
  });

  togglePasswordValidarBtn.addEventListener("click", function () {
    togglePasswordVisibility(passwordValidarInput, togglePasswordValidarBtn);
  });

  // Validaciones en tiempo real de contraseña
  passwordValidarInput.addEventListener("input", function () {
    if (passwordInput.value !== passwordValidarInput.value) {
      passwordValidarInput.classList.add("is-invalid");
      passwordValidarInput.classList.remove("is-valid");
    } else {
      passwordValidarInput.classList.remove("is-invalid");
      passwordValidarInput.classList.add("is-valid");
    }
  });

  passwordInput.addEventListener("input", function () {
    if (passwordValidarInput.value) {
      if (passwordInput.value !== passwordValidarInput.value) {
        passwordValidarInput.classList.add("is-invalid");
        passwordValidarInput.classList.remove("is-valid");
      } else {
        passwordValidarInput.classList.remove("is-invalid");
        passwordValidarInput.classList.add("is-valid");
      }
    }
  });

  // Validar contraseñas iguales
  function validarIgualdad() {
    if (passwordInput.value !== passwordValidarInput.value) {
      passwordValidarInput.setCustomValidity("Las contraseñas no coinciden");
      alert("Las contraseñas no coinciden");
      return false;
    } else {
      passwordValidarInput.setCustomValidity("");
      return true;
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;

    // Validaciones campo por campo
    if (nombreInput.value.trim() === "") {
      alert("Por favor ingresa tu nombre completo.");
      valid = false;
    }

    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefonoInput.value)) {
      alert("Por favor ingresa un número de teléfono válido (10 dígitos).");
      valid = false;
    }

    if (direccionInput.value.trim() === "") {
      alert("Por favor ingresa tu dirección.");
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("Por favor ingresa un email válido.");
      valid = false;
    }

    if (passwordInput.value.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      valid = false;
    }

    if (!validarIgualdad()) {
      valid = false;
    }

    if (!valid) return;

    // Validación de email duplicado y registro
    fetch("http://localhost:3002/users")
      .then(response => response.json())
      .then(users => {
        const emailExiste = users.some(user => user.email === emailInput.value.trim());

        if (emailExiste) {
          alert("El correo ya está registrado. Intenta con otro.");
          return;
        }

        let newId = 1;
        if (users.length > 0) {
          const lastUserId = Math.max(...users.map(user => parseInt(user.id, 10)));
          newId = lastUserId + 1;
        }

        const nuevoUsuario = {
          id: newId.toString(),
          nombre: nombreInput.value.trim(),
          telefono: telefonoInput.value.trim(),
          direccion: direccionInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value.trim()
        };

        return fetch("http://localhost:3002/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nuevoUsuario)
        });
      })
      .then(response => {
        if (response && response.ok) {
          return response.json();
        } else if (response) {
          throw new Error("Error al registrar usuario");
        }
      })
      .then(data => {
        if (data) {
          alert("Usuario agregado exitosamente!");
          form.reset();
        }
      })
      .catch(error => {
        console.error("Error al registrar usuario:", error);
        alert("Hubo un error al registrar el usuario. Inténtalo de nuevo.");
      });
  });
});
