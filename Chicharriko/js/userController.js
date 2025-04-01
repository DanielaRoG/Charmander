document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    // Inputs para el registro
    const nombreInput = document.getElementById("nombreUsuario");
    const telefonoInput = document.getElementById("telefonoUsuario");
    const direccionInput = document.getElementById("direccionUsuario");
    const emailInput = document.getElementById("emailUsuario");
    const passwordInput = document.getElementById("passwordUsuario");

    // Inputs para el inicio de sesión
    const emailLoginInput = document.getElementById("emailUsuario"); // Este es el mismo ID que el de registro
    const passwordLoginInput = document.getElementById("passwordUsuario"); // Este es el mismo ID que el de registro

    form.addEventListener("submit", function(event) {
        let valid = true;

        // Validación de Nombre Completo (solo en registro)
        if (nombreInput && nombreInput.value.trim() === "") {
            alert("Por favor ingresa tu nombre completo.");
            valid = false;
        }

        // Validación de Teléfono (solo en registro)
        const telefonoRegex = /^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/; // Formato: 55-55-55-55-55
        if (telefonoInput && !telefonoRegex.test(telefonoInput.value)) {
            alert("Por favor ingresa un número de teléfono válido (formato: 55-55-55-55-55).");
            valid = false;
        }

        // Validación de Dirección (solo en registro)
        if (direccionInput && direccionInput.value.trim() === "") {
            alert("Por favor ingresa tu dirección.");
            valid = false;
        }

        // Validación de Email (para ambos formularios)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para email
        if (!emailRegex.test(emailInput.value)) {
            alert("Por favor ingresa un email válido.");
            valid = false;
        }

        // Validación de Contraseña (para ambos formularios)
        if (passwordInput.value.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            valid = false;
        }

        // Validación de Email y Contraseña para inicio de sesión
        if (form.classList.contains('login-form')) { // Asegúrate de que el formulario de inicio de sesión tenga esta clase
            if (!emailRegex.test(emailLoginInput.value)) {
                alert("Por favor ingresa un email válido.");
                valid = false;
            }

            if (passwordLoginInput.value.length < 6) {
                alert("La contraseña debe tener al menos 6 caracteres.");
                valid = false;
            }
        }

        if (!valid) {
            event.preventDefault(); // Evita el envío del formulario si hay errores
        }
    });
});