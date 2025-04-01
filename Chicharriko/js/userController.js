document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const alertContainer = document.getElementById("alertContainer"); // Contenedor para la alerta
    const nombreInput = document.getElementById("nombreUsuario");
    const telefonoInput = document.getElementById("telefonoUsuario");
    const direccionInput = document.getElementById("direccionUsuario");
    const emailInput = document.getElementById("emailUsuario");
    const passwordInput = document.getElementById("passwordUsuario");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let valid = true;

        // Validaciones...
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
            alert("Por favor ingresa un email válido.");
            valid = false;
        }
        if (passwordInput.value.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
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
            .then(response => response.json())
            .then(data => {
                // Mostrar alerta de Bootstrap
                alertContainer.innerHTML = `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                Usuario agregado exitosamente!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            `;

                form.reset();
            })
            .catch(error => {
                console.error("Error al registrar usuario:", error);
                alert("Hubo un error al registrar el usuario. Inténtalo de nuevo.");
            });
    });
});