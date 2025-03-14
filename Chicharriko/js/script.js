
//Implementar Javascript para validar datos de entrada

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el formulario y el botón de envío
    let formulario = document.querySelector(".contact-form");
    let botonEnviar = formulario.querySelector("button[type='submit']");

    // Escuchar el evento de envío del formulario
    botonEnviar.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario hasta validar

        let nombre = document.getElementById("nombre").value.trim();
        let apellido = document.getElementById("apellido").value.trim();
        let correo = document.getElementById("email").value.trim();
        let mensaje = document.getElementById("mensaje").value.trim();

        if (!validarNombre(nombre)) {
            alert("❌ Nombre inválido. Solo se permiten letras.");
            return;
        }

        if (!validarNombre(apellido)) {
            alert("❌ Apellido inválido. Solo se permiten letras.");
            return;
        }

        if (!validarCorreo(correo)) {
            alert("❌ Correo electrónico inválido. Debe contener '@' y un dominio válido.");
            return;
        }

        if (!validarMensaje(mensaje)) {
            alert("❌ Mensaje inválido. No debe contener caracteres especiales como <, >, @, #, $.");
            return;
        }

        // Si todas las validaciones pasan, enviar el formulario
        alert("✅ Formulario enviado, Gracias por tus comentarios");
        formulario.submit();
    });

    // Función para validar nombres y apellidos (solo letras y espacios)
    function validarNombre(texto) {
        let regex = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/;
        return regex.test(texto);
    }

    // Función para validar correo electrónico
    function validarCorreo(correo) {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(correo);
    }

    // Función para validar el mensaje (evita caracteres especiales)
    function validarMensaje(texto) {
        let regex = /^[a-zA-Z0-9ÁÉÍÓÚÑáéíóúñ\s.,!?]+$/;
        return regex.test(texto);
    }
});


/* Para Implementación de una función que envié los datos de entrada a un correo electrónico */
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