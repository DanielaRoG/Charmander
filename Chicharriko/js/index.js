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
