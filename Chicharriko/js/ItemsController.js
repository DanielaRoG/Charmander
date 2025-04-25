// ItemsController.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nuevoItemFormulario");
  const itemList = document.getElementById("list-items");
  const API_URL = "http://localhost:8080/api/Chicharrikos/productos";

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
      this.setCustomValidity("La existencia debe ser 0 o mayor.");
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
                    <img src="${item.imageUrl}" class="card-img-top" alt="${
        item.nombre
      }">
                    <div class="card-body">
                        <h5 class="card-title">${item.nombre}</h5>
                        <p class="card-text">$ ${item.precio.toFixed(
                          2
                        )} por 100 grs</p>
                        <p class="card-text">Existencias: ${item.existencia}</p>
                        <p class="card-text">Categoría: ${
                          item.categoria ? item.categoria.nombre : "N/A"
                        }</p>
                        <div class="d-flex justify-content-center gap-2">
                            <button class="btn btn-success agregar-carrito" data-id="${
                              item.idproducto
                            }">
                                <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
                            </button>
                            <button class="btn btn-danger" data-id="${
                              item.idproducto
                            }">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
      itemList.appendChild(card);
    });

      // Asignar evento a todos los botones de eliminar
      document.querySelectorAll(".btn-danger").forEach((btn) => {
        btn.addEventListener("click", async () => {
          if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            const id = btn.getAttribute("data-id");
            await deleteItem(Number(id));
          }
        });
      });
      
      console.log(`Se cargaron ${items.length} productos correctamente.`);
      
    } catch (error) {
      itemList.innerHTML = `
        <div class="col-12 text-center my-4">
          <div class="alert alert-danger">
            <i class="fa-solid fa-exclamation-triangle me-2"></i>
            Error al cargar los productos
          </div>
          <p>${error.message}</p>
        </div>
      `;
      showAlert("No se pudieron cargar los productos: " + error.message);
      console.error("Error al cargar los productos:", error);
    }
  }

  // Función para agregar un item al carrito
  function agregarAlCarrito(itemId) {
    let carrito = localStorage.getItem("carrito");
    carrito = carrito ? JSON.parse(carrito) : [];

    // Verificar si el item ya está en el carrito
    const itemExistente = carrito.find(
      (item) => item.idproducto === parseInt(itemId)
    );

    if (itemExistente) {
      // Si ya existe, incrementamos la cantidad
      itemExistente.cantidad = (itemExistente.cantidad || 1) + 1;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      showAlert(`Se ha aumentado la cantidad de "${itemExistente.nombre}" en el carrito.`, "success");
      return;
    }

    // Si no existe, buscar el item en la lista de productos y agregarlo al carrito
    fetch(`${API_URL}/${itemId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((item) => {
        console.log("Item recibido del backend:", item);
        carrito.push({ ...item, cantidad: 1 }); // Añadir el item con cantidad 1
        localStorage.setItem("carrito", JSON.stringify(carrito));
        showAlert(`"${item.nombre}" se ha añadido al carrito!`, "success");
        console.log("Carrito actualizado:", carrito);
      })
      .catch((error) => {
        showAlert("Error al agregar el producto al carrito.", "danger");
        console.error("Error al obtener el item:", error);
      });
  }

  // Event listener para los botones "Agregar al carrito"
  itemList.addEventListener("click", (event) => {
    if (event.target.classList.contains("agregar-carrito")) {
      const itemId = event.target.getAttribute("data-id");
      agregarAlCarrito(itemId);
    }
  });

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
    const categoriaId = document
      .getElementById("nuevoItemCategoriaInput")
      .value.trim();
    const imageUrl = document
      .getElementById("nuevoItemImagenInput")
      .value.trim();

    if (!validateInput(nombre)) {
      showAlert("El nombre del producto contiene caracteres no permitidos.");
      return;
    }

    if (!validateInput(precio.toString())) {
      showAlert("El precio contiene caracteres no permitidos.");
      return;
    }

    if (!validateInput(existencia.toString())) {
      showAlert("La existencia contiene caracteres no permitidos.");
      return;
    }

    // No validamos 'categoriaId' aquí, asumimos la validación HTML es suficiente
    const parsedCategoriaId = parseInt(categoriaId);
    if (
      isNaN(parsedCategoriaId) ||
      parsedCategoriaId < 10 ||
      parsedCategoriaId > 30
    ) {
      showAlert("La categoría debe ser un número entre 10 y 30.");
      return;
    }

    if (!validateURL(imageUrl)) {
      showAlert("Por favor, ingresa una URL válida.");
      return;
    }

    try {
      const nuevoItem = {
        nombre,
        precio,
        existencia,
        categoria: {
          categoria_id: parsedCategoriaId, // Enviamos la categoría como objeto con el ID
        },
        imageUrl,
      };

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoItem),
      });

      if (!response.ok) {
        let errorMessage = "Error al guardar el producto";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Si no podemos parsear el JSON, usamos el texto de la respuesta
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      showAlert("Producto agregado exitosamente!", "success");
      form.reset();
      loadAndRenderProducts(); // Usar la nueva función combinada
    } catch (error) {
      showAlert(`Error al guardar el producto: ${error.message}`, "danger");
      console.error("Error al agregar producto:", error.message);
    }
  });

  // ELIMINAR PRODUCTO
  async function deleteItem(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      showAlert("Producto eliminado exitosamente!", "success");
      loadAndRenderProducts(); // Usar la nueva función combinada
      
      // Actualizar el carrito si es necesario
      let carrito = localStorage.getItem("carrito");
      if (carrito) {
        carrito = JSON.parse(carrito);
        const carritoActualizado = carrito.filter(item => item.idproducto !== id);
        localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
      }
    } catch (error) {
      showAlert(`No se pudo eliminar el producto: ${error.message}`, "danger");
      console.error("Error al eliminar producto:", error);
    }
  }

  // INICIAR CON LA NUEVA FUNCIÓN COMBINADA
  loadAndRenderProducts();
});