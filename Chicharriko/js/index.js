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
