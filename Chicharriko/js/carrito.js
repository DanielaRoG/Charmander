document.addEventListener("DOMContentLoaded", () => {
  const carritoItemsTable = document.getElementById("carrito-items-table");
  const subtotalElement = document.getElementById("subtotal");
  const descuentoElement = document.getElementById("descuento");
  const envioElement = document.getElementById("envio");
  const totalElement = document.getElementById("total");
  const carritoVacioMensaje = document.getElementById("carrito-vacio");
  const codigoDescuentoInput = document.getElementById("codigo-descuento");
  const aplicarDescuentoBtn = document.getElementById("aplicar-descuento");
  const mensajeDescuento = document.getElementById("mensaje-descuento");
  const errorDescuento = document.getElementById("error-descuento");
  const finalizarCompraBtn = document.getElementById("finalizar-compra-btn");

  const CODIGO_DESCUENTO = "CHICHARRIKOS2025";
  const PORCENTAJE_DESCUENTO = 0.1; // 10%
  const PRECIO_ENVIO = 100.0;

  let descuentoAplicado = false;

  function mostrarCarrito() {
    const carrito = localStorage.getItem("carrito");
    const itemsEnCarrito = carrito ? JSON.parse(carrito) : [];

    carritoItemsTable.innerHTML = ""; // Limpiar tabla

    if (itemsEnCarrito.length === 0) {
      carritoVacioMensaje.style.display = "table-row";
      actualizarResumen();
      return;
    } else {
      carritoVacioMensaje.style.display = "none";
    }

    itemsEnCarrito.forEach((item) => {
      const row = carritoItemsTable.insertRow();

      // Celda de Producto
      const productoCell = row.insertCell();
      productoCell.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${item.imageUrl}" alt="${
        item.nombre
      }" width="80" class="me-2" style="border-radius: 5px;">
          <div class="ms-2">
            <strong>${item.nombre}</strong><br>
            <span>$${
              item.precio ? item.precio.toFixed(2) : "N/A"
            } por 100 grs</span>
          </div>
        </div>
      `;

      // Celda de Cantidad
      const cantidadCell = row.insertCell();
      cantidadCell.innerHTML = `
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary cambiar-cantidad" data-id="${item.idproducto}" data-accion="restar">-</button>
          <span class="mx-2">${item.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary cambiar-cantidad" data-id="${item.idproducto}" data-accion="sumar">+</button>
        </div>
      `;

      // Celda de Total del item
      const totalItemCell = row.insertCell();
      totalItemCell.textContent = `$${(item.precio * item.cantidad).toFixed(
        2
      )}`;

      // Celda de Acciones
      const accionesCell = row.insertCell();
      accionesCell.innerHTML = `<button class="btn btn-sm btn-danger eliminar-item-carrito" data-id="${item.idproducto}">Eliminar</button>`;
    });

    actualizarResumen();
  }

  function actualizarResumen() {
    const carrito = localStorage.getItem("carrito");
    const itemsEnCarrito = carrito ? JSON.parse(carrito) : [];

    let subtotal = 0;
    itemsEnCarrito.forEach((item) => {
      subtotal += (item.precio || 0) * item.cantidad;
    });

    let descuento = 0;
    if (descuentoAplicado) {
      descuento = subtotal * PORCENTAJE_DESCUENTO;
    }

    const total = subtotal - descuento + PRECIO_ENVIO;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    descuentoElement.textContent =
      descuentoAplicado && descuento > 0
        ? `- $${descuento.toFixed(2)}`
        : `$${descuento.toFixed(2)}`;
    envioElement.textContent = `$${PRECIO_ENVIO.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  function cambiarCantidadItem(itemId, accion) {
    let carrito = localStorage.getItem("carrito");
    carrito = carrito ? JSON.parse(carrito) : [];

    const itemIndex = carrito.findIndex(
      (item) => item.idproducto === parseInt(itemId)
    );

    if (itemIndex !== -1) {
      if (accion === "sumar") {
        carrito[itemIndex].cantidad++;
      } else if (accion === "restar" && carrito[itemIndex].cantidad > 1) {
        carrito[itemIndex].cantidad--;
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    }
  }

  function eliminarItemDelCarrito(itemId) {
    let carrito = localStorage.getItem("carrito");
    carrito = carrito ? JSON.parse(carrito) : [];
    const nuevoCarrito = carrito.filter(
      (item) => item.idproducto !== parseInt(itemId)
    );
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    mostrarCarrito();
  }

  aplicarDescuentoBtn.addEventListener("click", () => {
    const codigoIngresado = codigoDescuentoInput.value.trim();
    if (codigoIngresado === CODIGO_DESCUENTO && !descuentoAplicado) {
      descuentoAplicado = true;
      mensajeDescuento.style.display = "block";
      errorDescuento.style.display = "none";
      actualizarResumen();
    } else if (codigoIngresado === CODIGO_DESCUENTO && descuentoAplicado) {
      alert("El código de descuento ya ha sido aplicado.");
    } else {
      errorDescuento.style.display = "block";
      mensajeDescuento.style.display = "none";
      descuentoAplicado = false;
      actualizarResumen();
    }
  });

  carritoItemsTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("eliminar-item-carrito")) {
      const itemId = event.target.getAttribute("data-id");
      eliminarItemDelCarrito(itemId);
    } else if (event.target.classList.contains("cambiar-cantidad")) {
      const itemId = event.target.getAttribute("data-id");
      const accion = event.target.getAttribute("data-accion");
      cambiarCantidadItem(itemId, accion);
    }
  });

  finalizarCompraBtn.addEventListener("click", () => {
    const carrito = localStorage.getItem("carrito");
    const itemsEnCarrito = carrito ? JSON.parse(carrito) : [];

    if (itemsEnCarrito.length > 0) {
      alert("¡Gracias por tu compra!");
      localStorage.removeItem("carrito");
      mostrarCarrito();
    } else {
      alert("Tu carrito está vacío. ¡Agrega algunos productos!");
    }
  });

  mostrarCarrito();
});
