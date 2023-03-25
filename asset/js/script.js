const shopContainer = document.getElementById("shopContainer");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const conteoCarrito = document.getElementById("conteoCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
    const repeat = carrito.some(
      (repeatProduct) => repeatProduct.id === product.id
    );

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precioReferencia: product.precioReferencia,
        precio: product.precio,
        cantidad: product.cantidad,
      });
    }
    carritoCounter();
    saveLocal();
  });
});

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
