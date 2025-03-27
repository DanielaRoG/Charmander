document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newItemForm");
  const itemList = document.getElementById("list-items");

  // Function to validate input and prevent special characters
  function validateInput(input) {
    // Regex to allow only alphanumeric characters, spaces, and basic punctuation
    const validationRegex = /^[a-zA-Z0-9\s.,!?()-]+$/;
    return validationRegex.test(input);
  }

  // Function to show Bootstrap alert
  function showAlert(message, type = 'danger') {
    // Create alert container if it doesn't exist
    let alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.id = 'alert-container';
      alertContainer.classList.add('container', 'mt-3');
      document.querySelector('main').insertBefore(alertContainer, document.querySelector('main').firstChild);
    }

    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show');
    alertElement.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Clear previous alerts and add new alert
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertElement);
  }

  // Cargar los productos almacenados al iniciar
  loadItems();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("newItemNameInput").value.trim();
    const description = document.getElementById("newItemDescription").value.trim();
    const imageUrl = document.getElementById("newItemImageInput").value.trim();

    // Validate product name
    if (!validateInput(name)) {
      showAlert('El nombre del producto contiene caracteres no permitidos. Solo se permiten letras, números, espacios y signos de puntuación básicos.');
      return;
    }

    // Validate product description
    if (!validateInput(description)) {
      showAlert('La descripción contiene caracteres no permitidos. Solo se permiten letras, números, espacios y signos de puntuación básicos.');
      return;
    }

    // Validate image URL (basic URL validation)
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w\-.]*)*(\?.*)?(#.*)?$/i;
    if (!urlPattern.test(imageUrl)) {
      showAlert('Por favor, ingrese una URL de imagen válida.');
      return;
    }


    // If all validations pass, proceed with adding the item
    if (name && description && imageUrl) {
      const newItem = { name, description, imageUrl };
      saveItem(newItem);
      form.reset();
      showAlert('Producto agregado exitosamente!', 'success');
    }
  });

  function saveItem(item) {
    let items = JSON.parse(localStorage.getItem("products")) || [];
    items.push(item);
    localStorage.setItem("products", JSON.stringify(items));
    renderItems();
  }

  function loadItems() {
    renderItems();
  }

  function renderItems() {
    itemList.innerHTML = "";
    const items = JSON.parse(localStorage.getItem("products")) || [];

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4");
      card.innerHTML = `
        <div class="card">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <button class="btn btn-danger" onclick="deleteItem(${index})">Eliminar</button>
          </div>
        </div>
      `;
      itemList.appendChild(card);
    });
  }
});

function deleteItem(index) {
  let items = JSON.parse(localStorage.getItem("products")) || [];
  items.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(items));
  document.getElementById("list-items").innerHTML = "";
  document.dispatchEvent(new Event("DOMContentLoaded"));
}