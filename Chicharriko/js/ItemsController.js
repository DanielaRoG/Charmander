document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newItemForm");
  const itemList = document.getElementById("list-items");
  const API_URL = "http://localhost:3000/items";

  // VALIDAR INPUT
  function validateInput(input) {
    const validationRegex = /^[a-zA-Z0-9\s.,!?()-]+$/;
    return validationRegex.test(input);
  }

  // VALIDAR URL
  function validateURL(url) {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w\-.]*)*(\?.*)?(#.*)?$/i;
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
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <button class="btn btn-danger" data-id="${item.id}">Eliminar</button>
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

    const name = document.getElementById("newItemNameInput").value.trim();
    const description = document.getElementById("newItemDescription").value.trim();
    const imageUrl = document.getElementById("newItemImageInput").value.trim();

    if (!validateInput(name)) {
      showAlert("El nombre del producto contiene caracteres no permitidos.");
      return;
    }

    if (!validateInput(description)) {
      showAlert("La descripción contiene caracteres no permitidos.");
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
      const nextId = items.length > 0
      ? String(Math.max(...items.map(item => Number(item.id))) + 1)
      : "1";  // Si no hay productos, empieza desde "1"

      const newItem = { id: nextId, name, description, imageUrl };

  
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
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
      await fetch(`${API_URL}/${(id)}`, {
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
