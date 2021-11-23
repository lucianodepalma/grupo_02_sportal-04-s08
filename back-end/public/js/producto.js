window.onload = function() {

  // Obtiene url
  let url = serverUrl();
  // Usuario
  let userId = cookieValue("userId");
  if (userId) {
    fetch(url + "/api/users/" + userId)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      sessionStorage.setItem("userData", JSON.stringify(result));
    })
    .catch(function(errMsg){
      alert("El usuario no pudo ser accedido desde el servidor. Error: " + errMsg);
    });
  } else {
    sessionStorage.removeItem("userData");
  }

  // Productos en el carrito de ese usuario
  let cartId = "Cart-" + userId;
  let itemsPending = localStorage.getItem(cartId);
  if (itemsPending) {
    itemsPending = JSON.parse(itemsPending);
  } else {
    itemsPending = [];
  }

  // Agrega un producto al carrito
  let linkCart = document.querySelector("#add-to-cart");
  linkCart.addEventListener("click", function(e) {
    e.preventDefault();
    if (userId) {
      let newItem = {};
      // User
      newItem.user = userId;
      // Producto
      let productId = window.location.toString();
      idx = productId.lastIndexOf("/");
      productId = productId.substring(idx+1);
      newItem.product = productId;
      // Sexo
      let radioSex1 = document.querySelector(".hombre");
      let radioSex2 = document.querySelector(".mujer");
      if (radioSex1.checked) {
        newItem.sex = "hombre";
      } else if (radioSex2.checked) {
        newItem.sex = "mujer";
      }
      // Edad
      let radioAge1 = document.querySelector(".adulto");
      let radioAge2 = document.querySelector(".nino");
      if (radioAge1.checked) {
        newItem.age = "adulto";
      } else if (radioAge2.checked) {
        newItem.age = "nino";
      }
      // Color
      let radioColor1 = document.querySelector(".rojo");
      let radioColor2 = document.querySelector(".azul");
      let radioColor3 = document.querySelector(".amarillo");
      let radioColor4 = document.querySelector(".verde");
      if (radioColor1.checked) {
        newItem.color = "rojo";
      } else if (radioColor2.checked) {
        newItem.color = "azul";
      } else if (radioColor3.checked) {
        newItem.color = "amarillo";
      } else if (radioColor4.checked) {
        newItem.color = "verde";
      }
      // Talle
      let radioTalle1 = document.querySelector(".XS");
      let radioTalle2 = document.querySelector(".S");
      let radioTalle3 = document.querySelector(".M");
      let radioTalle4 = document.querySelector(".L");
      let radioTalle5 = document.querySelector(".XL");
      let radioTalle6 = document.querySelector(".XXL");
      if (radioTalle1.checked) {
        newItem.talle = "XS";
      } else if (radioTalle2.checked) {
        newItem.talle = "S";
      } else if (radioTalle3.checked) {
        newItem.talle = "M";
      } else if (radioTalle4.checked) {
        newItem.talle = "L";
      } else if (radioTalle5.checked) {
        newItem.talle = "XL";
      } else if (radioTalle6.checked) {
        newItem.talle = "XXL";
      }
      // Tamaño
      let size = document.querySelector("#select-size").value;
      newItem.size = size;
      // Cantidad
      let quantity = document.querySelector("#select-quantity").value;
      newItem.quantity = quantity;
      // Precio
      let price = document.querySelector(".product-desc-price");
      newItem.price = price.innerHTML.substring(1);
      // Arma array de producto en el carrito de ese usuario
      itemsPending.push(newItem);
      localStorage.setItem(cartId, JSON.stringify(itemsPending));
      // Actualiza el carrito
      let record = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        price: newItem.price
      }
      fetch(url + "/api/cart/add", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      })
      .then(function() {
        alert("Producto agregado al carrito.");
      })
      .catch(function(errMsg) {
        alert("El producto no ha podido agregarse al carrito. Error: " + errMsg);
      });
    } else {
      alert("Para agregar productos al carrito debe estar logueado.");
    }
  });

  // Actualiza ruta al carrito
  let goToCart = document.querySelector("#go-to-cart");
  goToCart.setAttribute("href", "/carrito/" + userId);

   // Ir al carrito
  goToCart.addEventListener("click", function(e) {
    if (!userId) {
      e.preventDefault();
      alert("Para agregar productos al carrito debe estar logueado.");
    }
  });
}

// Obtiene el ID del usuario de la cookie 'userId'.
function cookieValue (name) {
  let cookies = document.cookie + ";";
  let flagValor = false;
  let flagClave = true;
  let clave = "";
  let valor = "";
  let chr = "";
  for (let i = 0 ; i < cookies.length ; i++) {
    chr = cookies[i];
    if (chr != " ") {
      if (chr == ";") {
        if (clave == name) {
          return valor;
        } else {
          flagClave = true;
          flagValor = false
          clave = "";
          valor = "";
        }
      } else if (chr == "=") {
        flagClave = false;
        flagValor = true;
      } else {
        if (flagClave) {
          clave = clave + chr;
        } else if (flagValor) {
          valor = valor + chr;          
        }
      }
    }
  }
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