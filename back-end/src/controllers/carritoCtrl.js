// Carrito
const db = require('../database/models');

// Opciones del Select
const config = require("./config.js");

const controller = {
  retrive:
    function(req, res) {
      if (req.session.usuarioLogueado) {
        let query = "SELECT sportal_db.shopping_cart.id, sportal_db.products.id AS product_id, sportal_db.products.model, sportal_db.products.family_id,";
        query = query + " sportal_db.products.image, sportal_db.shopping_cart.price, sportal_db.shopping_cart.quantity, sportal_db.brands.icon";
        query = query + " FROM sportal_db.shopping_cart, sportal_db.products, sportal_db.brands";
        query = query + " WHERE sportal_db.shopping_cart.product_id = sportal_db.products.id AND sportal_db.products.brand_id = sportal_db.brands.id";
        query = query + " AND sportal_db.shopping_cart.status_id = 1";
        query = query + " AND sportal_db.shopping_cart.user_id = 2";
        query = query + " ORDER BY sportal_db.shopping_cart.updated_at DESC";
        db.sequelize.query(query)
        .then(function(result) {
          let totalItems = 0;
          let subTotal = 0;
          let families = [];
          let productsOnCart = [];
          let newData = result[0].map(function(elem) {
            totalItems = totalItems + elem.quantity;
            subTotal = subTotal + (elem.quantity * elem.price);
            if (!productsOnCart.includes(elem.product_id)) {
              productsOnCart.push(elem.product_id);
            }
            if (!families.includes(elem.family_id)) {
              families.push(elem.family_id);
            }
            return elem;
          });
          let totals = {
            items: totalItems,
            subTotal: subTotal,
            total: subTotal
          }
          // Otros productos similares
          let maxItems = ((newData.length / 4).toFixed(0)) * 4;
          let others = [];  
          db.Product.findAll()
          .then(function(prodList) {
            let newProducts = [];
            newProducts = prodList.filter(function(elem) {
              return (!newProducts.includes(elem.product_id) && families.includes(elem.family_id));
            })
            if (newProducts) {
              if (newProducts.length > 0) {
                if (newProducts.length > maxItems) {
                  let idxs = [];
                  let idx = 0;
                  let i = 0;
                  do {
                    idx = (Math.random() * (newProducts.length - 1)).toFixed(0);
                    if (!idxs.includes(idx)) {
                      idxs.push(idx);
                      others.push(newProducts[idx]);
                      i++;
                    }
                  } while (i < maxItems);
                } else {
                  others = newProducts;
                }
              }
            }
            res.render("carrito", {products: newData, misc: config.misc, totals, others});
          })
          .catch(function(errMsg) {
            res.send(errMsg);
          });
        })
        .catch(function(errMsg) {
          res.send(errMsg);
        });
      } else {
        res.send("Para acceder al carrito debe estar logueado.");
      }
    }
}

module.exports = controller;