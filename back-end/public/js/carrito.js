window.onload = function () {

  // Vaciar carrito
  let vaciarCarrito = document.querySelector("#btn-vaciar");
  vaciarCarrito.addEventListener("click", function(e) {
    e.preventDefault();
    if (qtyItems() > 0) {
      let resp = confirm("Es Ud seguro de vaciar su carrito ?");
      if (resp) {
        changeStatus(getUserId(), false);
      }
    } else {
      alert("El carrito está vacío.");
    }
  });

  // Pagar
  let pagarCarrito = document.querySelector("#btn-pagar");
  pagarCarrito.addEventListener("click", function(e) {
    e.preventDefault();
    if (qtyItems() > 0) {
      let resp = confirm("Es Ud seguro que desea facturar su compra ?");
      if (resp) {
        changeStatus(getUserId(), true);
      }
    } else {
      alert("El carrito está vacío.");
    }
  });

  // Costo de envio
  let costo = document.querySelector(".st-lbl2").innerHTML;
  costo = Number(costo.substring(1));
  let envio = document.querySelector(".env-sel");
  envio.addEventListener("change", function(e) {
    switch (envio.value) {
      case "retira-sucursal":
        costoEnvio = costo / 10; // 10%
        break;
      case "ml-envio":
        costoEnvio = costo * 15 / 100; // 15%
        break;
      case "oca-fast":
        costoEnvio = costo / 5; // 20%
        break;
      case "oca-normal":
        costoEnvio = costo / 20; // 5%
        break;
      default:
        costoEnvio = 0;
    }
    let gastosEnvio = document.querySelector(".env-lbl");
    gastosEnvio.innerHTML = "$" + costoEnvio.toFixed(2);
    let total = document.querySelector(".tot-lbl2");
    total.innerHTML = "$" + (costoEnvio + Number(costo)).toFixed(2);
  });

  // Eliminar un producto
  let eliminarProducto = document.querySelectorAll(".delete-link");
  eliminarProducto.forEach(element => {
    element.addEventListener("click", function(e) {
      e.preventDefault();
      let resp = confirm("Es Ud seguro que desea eliminar el producto ?");
      if (resp) {
        // ID de item del carrito
        let item = element.getAttribute("itemid");
        delItem(item);
      }
    });
  });

  // Sumar un producto
  let sumar = document.querySelectorAll(".upcount");
  sumar.forEach(element => {
    element.addEventListener("click", function(e) {
      e.preventDefault();
      // ID de item del carrito
      let item = element.getAttribute("itemid");
      updQty(item, true);
    });
  });

  // Restar un producto
  let restar = document.querySelectorAll(".dncount");
  restar.forEach(element => {
    element.addEventListener("click", function(e) {
      e.preventDefault();
      // Cantidad de un producto
      let qty = element.previousElementSibling;
      if (qty.innerHTML > 1) {
        // ID de item del carrito
        let item = element.getAttribute("itemid");
        updQty(item, false);
      }
    });
  });
}

// Cambia el estado de los items del carrito para un usuario a cancelado (status_id = 3)
function changeStatus (userId, mode) {
  // Obtiene URL
  let url = serverUrl() + "/api/cart/";
  if (mode) {
    url = url + "pay/";
  } else {
    url = url + "empty/";
  }
  url = url + userId;
  // Consume endpoint
  let data = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch(url, data)
  .then(function(result) {
    location.replace(serverUrl());
  })
  .catch(function(errMsg) {
    alert("El carrito no ha podido actualizarse. Error: " + errMsg);
  });
}

// Actualiza la cantidad de un item del carrito
function updQty (id, mode) {
  // Obtiene URL
  let url = serverUrl() + "/api/cart/";
  if (mode) {
    url = url + "moreOne/";
  } else {
    url = url + "lessOne/";
  }
  url = url + id;
  // Consume endpoint
  let data = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch(url, data)
  .then(function(result) {
    location.reload(true);
  })
  .catch(function(errMsg) {
    alert("El producto no ha podido actualizarse. Error: " + errMsg);
  });
}

// Cambia el estado de un item del carrito a cancelado (status_id = 3)
function delItem (id) {
  // Obtiene URL
  let url = serverUrl() + "/api/cart/can/" + id;
  // Consume endpoint
  let data = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch(url, data)
  .then(function(result) {
    location.reload(true);
  })
  .catch(function(errMsg) {
    alert("El producto no ha podido eliminarse del carrito. Error: " + errMsg);
  });

}

// Obtiene el id del usuario
function getUserId () {
  let idx = location.toString().lastIndexOf("/");
  let userId = location.toString().substring(idx+1);
  return userId;
}

// Obtiene la cantidad de items en el carrito
function qtyItems () {
  let count = document.querySelector(".count-value");
  return Number(count.innerHTML);
}

// Protocol, domain and port
function serverUrl () {
  let data = location.protocol;
  data = data + "//" + location.hostname;
  if (location.port != 80 && location.port != 443) {
    data = data + ":" + location.port;
  }
  return data;
}