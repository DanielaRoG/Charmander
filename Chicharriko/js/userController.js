document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const nombreInput = document.getElementById("nombreUsuario");
    const telefonoInput = document.getElementById("telefonoUsuario");
    const direccionInput = document.getElementById("direccionUsuario");
    const emailInput = document.getElementById("emailUsuario");
    const passwordInput = document.getElementById("passwordUsuario");
  
    form.addEventListener("submit", function(event) {
      let valid = true;
  
      // Validación de Nombre Completo
      if (nombreInput.value.trim() === "") {
        alert("Por favor ingresa tu nombre completo.");
        valid = false;
      }
  
      // Validación de Teléfono
      const telefonoRegex = /^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/; // Formato: 55-55-55-55-55
      if (!telefonoRegex.test(telefonoInput.value)) {
        alert("Por favor ingresa un número de teléfono válido (formato: 55-55-55-55-55).");
        valid = false;
      }
  
      // Validación de Dirección
      if (direccionInput.value.trim() === "") {
        alert("Por favor ingresa tu dirección.");
        valid = false;
      }
  
      // Validación de Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para email
      if (!emailRegex.test(emailInput.value)) {
        alert("Por favor ingresa un email válido.");
        valid = false;
      }
  
      // Validación de Contraseña
      if (passwordInput.value.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        valid = false;
      }
  
      if (!valid) {
        event.preventDefault(); // Evita el envío del formulario si hay errores
      }
    });
  });