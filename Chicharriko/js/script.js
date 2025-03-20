// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el formulario
    let formulario = document.querySelector(".contact-form");

    if (!formulario) {
        console.error(" No se encontró el formulario.");
        return;
    }

    let botonEnviar = formulario.querySelector("button[type='submit']");

    if (!botonEnviar) {
        console.error(" No se encontró el botón de envío.");
        return;
    }

    // Escuchar el evento de envío del formulario
    botonEnviar.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar recarga antes de validar

        let nombre = document.getElementById("nombre")?.value.trim();
        let apellido = document.getElementById("apellido")?.value.trim();
        let correo = document.getElementById("email")?.value.trim();
        let mensaje = document.getElementById("mensaje")?.value.trim();

        // Validaciones
        if (!validarTexto(nombre)) {
            alert("Nombre inválido. Solo se permiten letras y espacios.");
            return;
        }

        if (!validarTexto(apellido)) {
            alert(" Apellido inválido. Solo se permiten letras y espacios.");
            return;
        }

        if (!validarCorreo(correo)) {
            alert(" Correo electrónico inválido. Debe contener '@' y un dominio válido.");
            return;
        }

        if (!validarMensaje(mensaje)) {
            alert(" Mensaje inválido. No debe contener caracteres especiales como <, >, @, #, $.");
            return;
        }

        // Si la validación pasa, se envía el correo
        enviarCorreo(nombre, apellido, correo, mensaje);
    });

    // Función para validar nombres y apellidos (solo letras y espacios)
    function validarTexto(texto) {
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

// Inicializar EmailJS con la clave pública
(function () {
    emailjs.init("iIMwrff8d-6vXi-xH"); // Reemplaza con tu Public Key de EmailJS CHICHARRIKOS
})();

// Función para enviar el correo
function enviarCorreo(nombre, apellido, correo, mensaje) {
    let paramsUsuario = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        mensaje: mensaje
    };

    let paramsAdmin = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        mensaje: mensaje
    };
    //Funcion para enviar correo al usuario
    console.log(" Enviado al usuario:");
    emailjs.send("service_bc0wkbb", "template_usuario", paramsUsuario)// ID del servicio y ID del template
        .then(function (response) {
            alert("Hemos recibido tu correo con éxito!");
            console.log(" Énviado el correo al usuario:", response);
        })
        .catch(function (error) {
            console.error(" Error al enviar correo al usuario", error);
        });
    
        //Funcion para enviar correo al admin
    console.log("Enviado al administrador");
    emailjs.send("service_bc0wkbb", "template_admin", paramsAdmin) // Cambiar "template_admin"
        .then(function (response) {
            console.log(" Correo enviado al administrador:", response);
            document.querySelector(".contact-form").reset(); // Para limpiar formulario
        })    

        .catch(function (error) {
            console.error(" Error al enviar correo al admin:", error);
        });
    }

