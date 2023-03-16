const shopContainer = document.getElementById("shopContainer");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");

let carrito = [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "tarjetas";
  content.innerHTML = `
  <img src = "${product.img}">
  <h3>${product.nombre}</h3>
  <p class = "precio-anclaje">$ ${product.precioReferencia}</p>
  <p class = "price">$ ${product.precio}</p>
  `;

  shopContainer.append(content);

  let agregar = document.createElement("button");
  agregar.innerText = "Agregar";
  agregar.className = "btn btn-success";

  content.append(agregar);

  agregar.addEventListener("click", () => {
    carrito.push({
      id: product.id,
      img: product.img,
      nombre: product.nombre,
      precioReferencia: product.precioReferencia,
      precio: product.precio,
    });
  });
});

verCarrito.addEventListener("click", () => {
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  <h2 class="modal-header-title">Carrito</h2>
  `;
  modalContainer.append(modalHeader);

  const modalExit = document.createElement("div");
  modalExit.innerHTML = `
  <img src = "./asset/img/cerrar.png" alt="boton cerrar">
  `;
  modalExit.className = "modal-header-button";

  modalHeader.append(modalExit);
});
