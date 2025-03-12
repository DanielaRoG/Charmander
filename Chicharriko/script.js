
//Implementar Javascript para validar datos de entrada

document.getElementById("formulario").addEventListener("submit", function(event) {
    let isValid = true;

    // Validar Nombre
    const nombre = document.getElementById("nombre").value.trim();
    const errorNombre = document.getElementById("error-nombre");
    if (nombre === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        isValid = false;
    } else {
        errorNombre.textContent = "";
    }

    // Validar Email
    const email = document.getElementById("email").value.trim();
    const errorEmail = document.getElementById("error-email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorEmail.textContent = "Ingrese un correo válido.";
        isValid = false;
    } else {
        errorEmail.textContent = "";
    }
});

/* Para Implementación de una función que envié los datos de entada a un correo electrónico */
(function() {
    emailjs.init("TU_PUBLIC_KEY"); // Pendiente modificar Public Key de EmailJ (credenciales)
})();

function enviarCorreo(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    
    let params = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        mensaje: document.getElementById("mensaje").value
    };

    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", params)
        .then(function(response) {
            alert("Correo enviado con éxito!");
            console.log("Éxito:", response);
        }, function(error) {
            alert("Error al enviar el correo.");
            console.log("Error:", error);
        });
}