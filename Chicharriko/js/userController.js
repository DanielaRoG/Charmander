document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const alertContainer = document.getElementById("alertContainer"); // Contenedor para la alerta
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
        button.innerHTML = "🫣"; // Ícono de ocultar
      } else {
        input.type = "password";
        button.innerHTML = "👀"; // Ícono de mostrar
      }
    }
    // Event listeners para los botones de mostrar contraseña
    togglePasswordBtn.addEventListener("click", function () {
      togglePasswordVisibility(passwordInput, togglePasswordBtn);
    });
  
    togglePasswordValidarBtn.addEventListener("click", function () {
      togglePasswordVisibility(passwordValidarInput, togglePasswordValidarBtn);
    });  


  
  form.addEventListener("submit", function (event) {
      event.preventDefault();
      let valid = true;

    // Función para validar que las contraseñas coincidan
    function validarIgualdad() {
      if (passwordInput.value !== passwordValidarInput.value) {
        passwordValidarInput.setCustomValidity('Las contraseñas no coinciden');
        alerta("Las contraseñas no coinciden", "danger");
        return false;
      } else {
        passwordValidarInput.setCustomValidity('');
        return true;
      }
    }
  
    // Validación en tiempo real para contraseñas
    passwordValidarInput.addEventListener('input', function() {
      if (passwordInput.value !== passwordValidarInput.value) {
        passwordValidarInput.classList.add('is-invalid');
        passwordValidarInput.classList.remove('is-valid');
        alerta("Las contraseñas no coinciden", "danger");
      } else {
        passwordValidarInput.classList.remove('is-invalid');
        passwordValidarInput.classList.add('is-valid');
        alerta("Las contraseñas coinciden", "success");
      }
    });
    
    // También validar cuando se cambia la primera contraseña
    passwordInput.addEventListener('input', function() {
      if (passwordValidarInput.value) {
        if (passwordInput.value !== passwordValidarInput.value) {
          passwordValidarInput.classList.add('is-invalid');
          passwordValidarInput.classList.remove('is-valid');
          alerta("Las contraseñas no coinciden", "danger");
        } else {
          passwordValidarInput.classList.remove('is-invalid');
          passwordValidarInput.classList.add('is-valid');
          alerta("Las contraseñas coinciden", "success");
        }
      }
    }); 

      // Validaciones por camppo
      if (nombreInput.value.trim() === "") {
          alert("Por favor ingresa tu nombre completo.");
          valid = false;
      }
      const telefonoRegex = /^\d{10}$/; 
      if (!telefonoRegex.test(telefonoInput.value)) {
          alert("Por favor ingresa un número de teléfono válido (10 dígitos numéricos).");
          valid = false;
      }
      if (direccionInput.value.trim() === "") {
          alert("Por favor ingresa tu dirección.");
          valid = false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if (!emailRegex.test(emailInput.value)) {
          alert("Por favor ingresa un email válido.","danger");
          valid = false;
      }
      if (passwordInput.value.length < 6) {
          alert("La contraseña debe tener al menos 6 caracteres.","danger");
          valid = false;
      }

      // Validar que las contraseñas coincidan
      if (!validarIgualdad()) {
      valid = false;
      }

      if (!valid) return; // Si hay errores, no continuar

      // Obtener el último ID registrado
      fetch("http://localhost:3002/users")
        .then(response => response.json())
        .then(users => {
          let newId = 1;
          if (users.length > 0) {
            // Convertir los IDs a números y obtener el último ID
            const lastUserId = Math.max(...users.map(user => parseInt(user.id, 10)));
            newId = lastUserId + 1;
          }

          const nuevoUsuario = {
            id: newId.toString(), // Guardar como string si JSON-Server lo requiere
            nombre: nombreInput.value.trim(),
            telefono: telefonoInput.value.trim(),
            direccion: direccionInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
            //agregar validacion de contraseña
            passwordUsuarioValidar:passwordValidarInput.value.trim()
          };

          return fetch("http://localhost:3002/users", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(nuevoUsuario)
          });
        })
        .then(response => response.json())
        .then(data => {
            // Mostrar alerta de Bootstrap
            alertContainer.innerHTML = `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                Usuario agregado exitosamente!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`;
              
            form.reset();
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);
            alert("Hubo un error al registrar el usuario. Inténtalo de nuevo.","danger");
        });
  });
});
