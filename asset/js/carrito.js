const pushCarrito = () => {
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
  modalExit.innerText = `❌`;
  modalExit.className = "modal-header-button";

  modalExit.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalExit);
  //Creador de productos en carrito
  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class = "precio-anclaje">$ ${product.precioReferencia}</p>
      <p>$ ${product.precio}</p>
        <div class = "quantity">
          <button class= "restar"> - </button>
          <p>Cantidad: ${product.cantidad}</p>
          <button class= "sumar"> + </button>
        </div> 
      <p>SubTotal: $${product.cantidad * product.precio}</p>
      <span class = "dlt-product"> 🗑️ </span>
      `;

    modalContainer.append(carritoContent);

    //Sumar y Restar productos desde el carrito
    let restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      pushCarrito();
      saveLocal();
    });
    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      pushCarrito();
      saveLocal();
    });

    let dlt = carritoContent.querySelector(".dlt-product");
    dlt.addEventListener("click", () => {
      dltProduct(product.id);
    });

    //Btn Eliminador de productos
    //   let dlt = document.createElement("span");
    //   dlt.innerText = "🗑️";
    //   dlt.className = "dlt-product";
    //   carritoContent.append(dlt);

    //   dlt.addEventListener("click", dltProduct);
  });

  const totalReferencia = carrito.reduce(
    (ac, e) => ac + e.precioReferencia * e.cantidad,
    0
  );
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalAnclaje = document.createElement("div");
  totalAnclaje.className = "total-anclaje";
  totalAnclaje.innerHTML = `<p class = "precio-anclaje">Valor Referencia: $ ${totalReferencia}</p>
    <p>Total a Pagar: $ ${total}</p>
    `;
  modalContainer.append(totalAnclaje);
};

verCarrito.addEventListener("click", pushCarrito);

// Funcion borrar productos del carrito
const dltProduct = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoCounter(); //me muestra el contador del carrito
  saveLocal(); //refleja los cambios en el carrito post refresco de página
  pushCarrito(); //volver a generar el carrito
};

const carritoCounter = () => {
  conteoCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  conteoCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();
