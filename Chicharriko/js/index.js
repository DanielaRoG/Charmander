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


// Función para agregar un item al HTML
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

// Cargar items desde localStorage al DOM
function loadItemsFromStorage() {
  document.getElementById("list-items").innerHTML = ""; // Limpiar antes de renderizar
  itemsController.items.forEach((item) => addItemToList(item));
}

// Cargar datos de muestra solo si localStorage está vacío
function loadSampleItems() {
  if (itemsController.items.length === 0) {
    sampleItems.forEach((item) => {
      itemsController.addItem(item.name, item.description, item.img);
    });
    itemsController.saveToLocalStorage();
  }
}

// Evento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  itemsController.loadFromLocalStorage(); // Cargar desde localStorage
  loadSampleItems(); // Solo si está vacío
  loadItemsFromStorage(); // Renderizar los items en el DOM
});

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

  const newItem = { name, description, img };

  itemsController.addItem(name, description, img);
  itemsController.saveToLocalStorage();
  addItemToList(newItem);

  // Limpiar formulario
  document.querySelector("#newItemForm").reset();
});
>>>>>>> c9e183a04fb24d312866b35d0b18fcc35ff5db32
