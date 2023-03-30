const modalContainerHTML = () => {
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
};

const recorrerCarrito = () => {
  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}"/>
      <h3 class = "nombre_producto">${product.nombre}</h3>
      <div class = "precio_producto">
        <p>Precio Producto</p>
        <p class = "precio-anclaje">$ ${product.precioReferencia}</p>
      </div>
      <div>
        <p>Precio Oferta</p>
        <p>$ ${product.precio}</p>
      </div>
        <div class = "quantity">
          <p>Cantidad: </p>
          <div class = quantity-btn>
            <button class= "restar btn_operation"> - </button>
            <p>${product.cantidad}</p>
            <button class= "sumar btn_operation"> + </button>
          </div>
        </div> 
      <p class = "subtotal-p">SubTotal: $${
        product.cantidad * product.precio
      }</p>
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
    //Eliminar productos
    let dlt = carritoContent.querySelector(".dlt-product");
    dlt.addEventListener("click", () => {
      dltProduct(product.id);
    });
  });
};

const sumarCarrito = () => {
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
const pushCarrito = () => {
  modalContainerHTML();
  recorrerCarrito();
  sumarCarrito();
  // carrito.forEach((product) => {
  //   let carritoContent = document.createElement("div");
  //   carritoContent.className = "modal-content";
  //   carritoContent.innerHTML = `
  //     <img src="${product.img}>"
  //     <h3>${product.nombre}</h3>
  //     <p class = "precio-anclaje">$ ${product.precioReferencia}</p>
  //     <p>$ ${product.precio}</p>
  //       <div class = "quantity">
  //         <button class= "restar btn_operation"> - </button>
  //         <p>Cantidad: ${product.cantidad}</p>
  //         <button class= "sumar btn_operation"> + </button>
  //       </div>
  //     <p class = "subtotal-p">SubTotal: $${
  //       product.cantidad * product.precio
  //     }</p>
  //     <span class = "dlt-product"> 🗑️ </span>
  //     `;
  //   modalContainer.append(carritoContent);

  //   //Sumar y Restar productos desde el carrito
  //   let restar = carritoContent.querySelector(".restar");
  //   restar.addEventListener("click", () => {
  //     if (product.cantidad !== 1) {
  //       product.cantidad--;
  //     }
  //     pushCarrito();
  //     saveLocal();
  //   });
  //   let sumar = carritoContent.querySelector(".sumar");
  //   sumar.addEventListener("click", () => {
  //     product.cantidad++;
  //     pushCarrito();
  //     saveLocal();
  //   });
  //   //Eliminar productos
  //   let dlt = carritoContent.querySelector(".dlt-product");
  //   dlt.addEventListener("click", () => {
  //     dltProduct(product.id);
  //   });
  // });

  // const totalReferencia = carrito.reduce(
  //   (ac, e) => ac + e.precioReferencia * e.cantidad,
  //   0
  // );
  // const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  // const totalAnclaje = document.createElement("div");
  // totalAnclaje.className = "total-anclaje";
  // totalAnclaje.innerHTML = `<p class = "precio-anclaje">Valor Referencia: $ ${totalReferencia}</p>
  //   <p>Total a Pagar: $ ${total}</p>
  //   `;
  // modalContainer.append(totalAnclaje);
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
