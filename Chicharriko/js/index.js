<<<<<<< HEAD
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
=======
// Inicializa ItemsController
const itemsController = new ItemsController(0);

// Lista de 10 objetos de muestra
const sampleItems = [
  {
    name: "Chips",
    img: "https://images.pexels.com/photos/568805/pexels-photo-568805.jpeg",
    description: "Cheese & Onion Chips",
  },
  {
    name: "Juice",
    img: "https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg",
    description: "Orange and Apple juice fresh and delicious",
  },
  {
    name: "Chocolate",
    img: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg",
    description: "Delicious dark chocolate",
  },
  {
    name: "Soda",
    img: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg",
    description: "Refreshing soda drink",
  },
  {
    name: "Cookies",
    img: "https://images.pexels.com/photos/1740891/pexels-photo-1740891.jpeg",
    description: "Crispy chocolate chip cookies",
  },
  {
    name: "Coffee",
    img: "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg",
    description: "Hot and fresh coffee",
  },
  {
    name: "Ice Cream",
    img: "https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg",
    description: "Vanilla ice cream in a cone",
  },
  {
    name: "Bread",
    img: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg",
    description: "Freshly baked bread",
  },
  {
    name: "Cheese",
    img: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg",
    description: "Swiss cheese slices",
  },
  {
    name: "Strawberries",
    img: "https://images.pexels.com/photos/583840/pexels-photo-583840.jpeg",
    description: "Fresh and juicy strawberries",
  },
];

// Función para agregar items al HTML
function addItemToList(item) {
  const itemHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${item.img}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <a href="#" class="btn btn-primary">Add</a>
            </div>
        </div>
        <br/>
    `;
  document.getElementById("list-items").innerHTML += itemHTML;
}

// Cargar items de muestra al iniciar
function loadSampleItems() {
  sampleItems.forEach((item) => {
    itemsController.addItem(item.name, item.description, item.img);
    addItemToList(item);
  });
}

document.addEventListener("DOMContentLoaded", loadSampleItems);

// Manejo del formulario para agregar nuevos productos
document.querySelector("#newItemForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar recargar la página

  const name = document.querySelector("#newItemNameInput").value.trim();
  const description = document
    .querySelector("#newItemDescription")
    .value.trim();
  const img = document.querySelector("#newItemImageInput").value.trim();

  if (!name || !description) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  itemsController.addItem(name, description, img);
  addItemToList({ name, description, img });

  // Limpiar formulario
  document.querySelector("#newItemForm").reset();
});
>>>>>>> c9e183a04fb24d312866b35d0b18fcc35ff5db32
