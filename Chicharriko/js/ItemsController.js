document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nuevoItemFormulario");
  const itemList = document.getElementById("list-items");
  const API_URL = "http://localhost:3000/items";

  // VALIDACIÓN PERSONALIZADA PARA MENSAJES HTML5
  function setCustomValidationMessages() {
    const nombreInput = document.getElementById("nuevoItemNombreInput");
    const precioInput = document.getElementById("nuevoItemPrecioInput");
    const existenciaInput = document.getElementById("nuevoItemExistenciaInput");
    const categoriaInput = document.getElementById("nuevoItemCategoriaInput");
    const imagenInput = document.getElementById("nuevoItemImagenInput");

    nombreInput.addEventListener("invalid", function () {
      this.setCustomValidity(
        "Por favor, ingresa un nombre válido (sin caracteres especiales)."
      );
    });
    nombreInput.addEventListener("input", function () {
      this.setCustomValidity("");
    });

    precioInput.addEventListener("invalid", function () {
      this.setCustomValidity("El precio debe estar entre $1.00 y $1000.00.");
    });
    precioInput.addEventListener("input", function () {
      this.setCustomValidity("");
    });

    existenciaInput.addEventListener("invalid", function () {
      this.setCustomValidity(
        "La existencia debe ser 0 o mayor."
      );
    });
    existenciaInput.addEventListener("input", function () {
      this.setCustomValidity("");
    });

    categoriaInput.addEventListener("invalid", function () {
      this.setCustomValidity("La categoría debe ser un número entre 10 y 30.");
    });
    categoriaInput.addEventListener("input", function () {
      this.setCustomValidity("");
    });

    imagenInput.addEventListener("invalid", function () {
      this.setCustomValidity(
        "Por favor, proporciona una URL válida de imagen."
      );
    });
    imagenInput.addEventListener("input", function () {
      this.setCustomValidity("");
    });
  }

  // LLAMAR LA FUNCIÓN DE VALIDACIÓN PERSONALIZADA
  setCustomValidationMessages();

  // Llamamos la función para configurar los mensajes personalizados
  setCustomValidationMessages();

  // VALIDAR INPUT
  function validateInput(input) {
    const validationRegex = /^[a-zA-Z0-9\s.,!?()\-áéíóúÁÉÍÓÚñÑ]+$/;
    return validationRegex.test(input);
  }

  // VALIDAR URL
  function validateURL(url) {
    const urlPattern =
      /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w\-.]*)*(\?.*)?(#.*)?$/i;
    return urlPattern.test(url);
  }

  // MOSTRAR ALERTAS
  function showAlert(message, type = "danger") {
    let alertContainer = document.getElementById("alert-container");
    if (!alertContainer) {
      alertContainer = document.createElement("div");
      alertContainer.id = "alert-container";
      alertContainer.classList.add("container", "mt-3");
      document.querySelector("main").prepend(alertContainer);
    }

    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  // RENDERIZAR PRODUCTOS
  function renderItems(items) {
    itemList.innerHTML = "";
    items.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-3");
      card.innerHTML = `
        <div class="card">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.nombre}">
          <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">$ ${item.precio.toFixed(2)} por 100 grs</p>
             <p class="card-text">Existencias: ${item.existencia}</p>
              <p class="card-text">Categoría: ${item.categoria}</p>
            <button class="btn btn-danger" data-id="${
              item.id
            }">Eliminar</button>
          </div>
        </div>
      `;
      itemList.appendChild(card);
    });

    // Asignar evento a todos los botones de eliminar
    document.querySelectorAll(".btn-danger").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        await deleteItem(Number(id));
      });
    });
  }

  // CARGAR PRODUCTOS
  async function loadItems() {
    try {
      const response = await fetch(API_URL);
      const items = await response.json();
      renderItems(items);
    } catch (error) {
      showAlert("No se pudieron cargar los productos.");
      console.error(error);
    }
  }

  // AGREGAR PRODUCTO
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nuevoItemNombreInput").value.trim();
    const precio = parseFloat(
      document.getElementById("nuevoItemPrecioInput").value.trim()
    );
    const existencia = parseInt(
      document.getElementById("nuevoItemExistenciaInput").value.trim()
    );
    const categoria = document
      .getElementById("nuevoItemCategoriaInput")
      .value.trim();
    const imageUrl = document
      .getElementById("nuevoItemImagenInput")
      .value.trim();

    if (!validateInput(nombre)) {
      showAlert("El nombre del producto contiene caracteres no permitidos.");
      return;
    }

    if (!validateInput(precio)) {
      showAlert("El precio contiene caracteres no permitidos.");
      return;
    }

    if (!validateInput(existencia)) {
      showAlert("La existencia contiene caracteres no permitidos.");
      return;
    }

    if (!validateInput(categoria)) {
      showAlert("Categoria fuera de límite.");
      return;
    }

    if (!validateURL(imageUrl)) {
      showAlert("Por favor, ingresa una URL válida.");
      return;
    }

    try {
      // Obtener los productos actuales
      const response = await fetch(API_URL);
      const items = await response.json();

      // Obtener el siguiente ID (empezando desde 0 si no hay productos)
      const nextId =
        items.length > 0
          ? String(Math.max(...items.map((item) => Number(item.id))) + 1)
          : "1"; // Si no hay productos, empieza desde "1"

      const nuevoItem = {
        id: nextId,
        nombre,
        precio,
        existencia,
        categoria,
        imageUrl,
      };

      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoItem),
      });

      showAlert("Producto agregado exitosamente!", "success");
      form.reset();
      loadItems();
    } catch (error) {
      showAlert("Hubo un error al guardar el producto.");
      console.error(error);
    }
  });

  // ELIMINAR PRODUCTO
  async function deleteItem(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      loadItems();
    } catch (error) {
      showAlert("No se pudo eliminar el producto.");
      console.error(error);
    }
  }

  // INICIAR
  loadItems();
});
