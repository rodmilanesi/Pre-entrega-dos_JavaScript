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

  // console.log(carrito);
});

verCarrito.addEventListener("click", () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  verCarrito.innerHTML = "";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  <h2 class="modal-header-title">Carrito</h2>
  `;
  modalContainer.append(modalHeader);

  const modalExit = document.createElement("h2");
  modalExit.innerText = `X`;
  modalExit.className = "modal-header-button";

  modalExit.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalExit);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class = "precio-anclaje">$ ${product.precioReferencia}</p>
    <p>$ ${product.precio}</p>
    `;

    modalContainer.append(carritoContent);
  });

  const totalReferencia = carrito.reduce((ac, e) => ac + e.precioReferencia, 0);
  const total = carrito.reduce((acc, el) => acc + el.precio, 0);

  const totalAnclaje = document.createElement("div");
  totalAnclaje.className = "total-anclaje";
  totalAnclaje.innerHTML = `<p class = "precio-anclaje">Valor Referencia: $ ${totalReferencia}</p>
  <p>Total a Pagar: $ ${total}</p>
  `;
  modalContainer.append(totalAnclaje);
});
