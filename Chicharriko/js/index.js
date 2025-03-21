document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("iIMwrff8d-6vXi-xH"); // Reemplaza con tu Public Key de EmailJS

    let formulario = document.querySelector(".contact-form");
    if (!formulario) return console.error("No se encontró el formulario.");

    let botonEnviar = formulario.querySelector("button[type='submit']");
    if (!botonEnviar) return console.error("No se encontró el botón de envío.");

    botonEnviar.addEventListener("click", function (event) {
        event.preventDefault();
        botonEnviar.disabled = true; // 🔹 Deshabilitamos el botón para evitar doble clic

        let nombre = document.getElementById("nombre")?.value.trim();
        let apellido = document.getElementById("apellido")?.value.trim();
        let correo = document.getElementById("email")?.value.trim();
        let mensaje = document.getElementById("mensaje")?.value.trim();

        if (!validarTexto(nombre) || !validarTexto(apellido) || !validarCorreo(correo) || !validarMensaje(mensaje)) {
            alert("Revisa los campos ingresados.");
            botonEnviar.disabled = false; // 🔹 Habilitamos el botón si hay error
            return;
        }

        enviarCorreo(nombre, apellido, correo, mensaje, function () {
            botonEnviar.disabled = false; // 🔹 Reactivamos el botón después del envío
        });
    });

    function validarTexto(texto) {
        return /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/.test(texto);
    }

    function validarCorreo(correo) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo);
    }

    function validarMensaje(texto) {
        return /^[a-zA-Z0-9ÁÉÍÓÚÑáéíóúñ\s.,!?]+$/.test(texto);
    }
});

function enviarCorreo(nombre, apellido, correo, mensaje, callback) {
    let paramsUsuario = {
        email: correo,
        nombre: nombre,
        apellido: apellido,
        mensaje: mensaje
    };

    let paramsAdmin = {
        nombre: nombre,
        apellido: apellido,
        mensaje: mensaje,// 🔹 No agregamos "email" si ya está en el template
    };

    emailjs.send("service_61ns5ta", "template_eonfg6q", paramsUsuario)
        .then(function (response) {
            console.log("Correo enviado al usuario:", response);
            alert("Hemos recibido tu correo con éxito!");
        })
        .catch(function (error) {
            console.error("Error al enviar correo al usuario", error);
        });

    emailjs.send("service_61ns5ta", "template_00pcup8", paramsAdmin)
        .then(function (response) {
            console.log("Correo enviado al administrador:", response);
            document.querySelector(".contact-form").reset();
        })
        .catch(function (error) {
            console.error("Error al enviar correo al admin:", error);
        })
        .finally(function () {
            if (callback) callback(); // 🔹 Reactivar botón después del envío
        });
}
