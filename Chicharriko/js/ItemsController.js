document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newItemForm");
  const itemList = document.getElementById("list-items");

  // Cargar los productos almacenados al iniciar
  loadItems();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("newItemNameInput").value;
    const description = document.getElementById("newItemDescription").value;
    const imageUrl = document.getElementById("newItemImageInput").value;

    if (name && description && imageUrl) {
      const newItem = { name, description, imageUrl };
      saveItem(newItem);
      form.reset();
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
