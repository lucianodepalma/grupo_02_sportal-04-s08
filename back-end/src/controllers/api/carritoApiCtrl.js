// Productos

// In / Out File System
const db = require('../../database/models');

// Config
const config = require("../../controllers/config.js");

// Controller
const controller = {
  allRecords:
    // Obtiene todos los registros de un usuario ordenados por fecha de ultima modificacion
    // Uso: /api/cart/all/:userId
    // Out: {
    //        count:   Cantidad de registros
    //        records: Array de registros
    //        status:  Codigo de error
    //      }
    function (req, res) {
      db.ShoppingCart.findAll({
        where: {
          user_id: req.params.userId,
          status_id: 1
        },
        order: [['updated_at', 'DESC']],
        raw: true
      })
      .then(function(records) {
        let result = {
          count: records.length,
          records: records,
          status: 200
        }
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  oneRecord:
    // Obtiene un registro
    // Uso: /api/cart/one/:id
    // Out: {
    //        record: Registro
    //        status: Codigo de error
    //      }
    function (req, res) {
      db.ShoppingCart.findByPk(req.params.id)
      .then(function(record) {
        let result = {
          record: record,
          status: 200
        }
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  addRecord:
    // Agrega un registro al carrito
    // Uso: /api/cart/add (Post)
    // Debe informar el body (como parametros del fetch/axios) con los campos a actualizar
    function (req, res) {
      db.ShoppingCart.create({
        user_id: req.body.userId,
        product_id: req.body.productId,
        quantity: req.body.quantity,
        price: req.body.price,
        status_id: 1
      })
      .then(function(record) {
        res.status(200).json(record);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  updRecord:
    // Actualiza un registro del carrito
    // Uso: /api/cart/upd/:id (Post)
    // Debe informar el body (como parametros del fetch/axios) con los campos a actualizar
    function (req, res) {
      db.ShoppingCart.update({
        user_id: req.body.userId,
        product_id: req.body.productId,
        quantity: req.body.quantity,
        price: req.body.price,
        status_id: req.body.status
      },
        {where: {id: req.params.id}
      })
      .then(function(record) {
        res.status(200).json(record);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  delRecord:
    // Elimina un registro del carrito
    // Uso: /api/cart/del/:id (Post)
    function (req, res) {
      db.ShoppingCart.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(record) {
        res.status(200).json(record);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  canRecord:
    // Cancela un item del carrito
    // Uso: /api/cart/can/:id (Post)
    function (req, res) {
      db.ShoppingCart.update({
        status_id: 3 // Cancelled
      },
        {where: {id: req.params.id}
      })
      .then(function(record) {
        res.status(200).json(record);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  empty:
    // Vacia el carrito
    // Uso: /api/cart/empty/:userId (Post)
    function (req, res) {
      db.ShoppingCart.update({
        status_id: 3 // Cancelled
      },
        {where: {user_id: req.params.userId}
      })
      .then(function(record) {
        res.status(200).json(record);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  pay:
    // Factura el carrito
    // Uso: /api/cart/pay/:userId (Post)
    function (req, res) {
      db.ShoppingCart.update({
        status_id: 2 // Billed
      },
        {where: {user_id: req.params.userId}
      })
      .then(function(record) {
        res.status(200).json(record);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  moreOne:
    // Suma un producto
    // Uso: /api/cart/moreOne/:id (Post)
    function (req, res) {
      db.ShoppingCart.findByPk(req.params.id)
      .then(function(record) {
        let qty = record.quantity + 1;
        db.ShoppingCart.update({
          quantity: qty
        },
          {where: {id: req.params.id}
        })
        .then(function(record) {
          res.status(200).json(record);
        })
        .catch(function(errMsg) {
          res.json(errMsg);
        });
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  lessOne:
    // Resta un producto
    // Uso: /api/cart/lessOne/:id (Post)
    function (req, res) {
      db.ShoppingCart.findByPk(req.params.id)
      .then(function(record) {
        let qty = record.quantity - 1;
        if (qty > 0) {
          db.ShoppingCart.update({
            quantity: qty
          },
            {where: {id: req.params.id}
          })
          .then(function(record) {
            res.status(200).json(record);
          })
          .catch(function(errMsg) {
            res.json(errMsg);
          });
        } else {
          res.status(200).json(record);
        }
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  bestSeller:
    // Obtiene el producto mas vendido
    // Uso: /api/cart/bestSeller
    // Out: {
    //        record: Producto mas vendido
    //        status:  Codigo de error
    //      }
    function (req, res) {
      db.ShoppingCart.findAll({
        where: {
          status_id: 2
        }
      })
      .then(function(records) {
        let codes = [];
        let sales = [];
        let record = [];
        let idx = 0;
        records.map(function(elem) {
          let code = elem.product_id;
          let idx = codes.findIndex(function(elem) {;
            if (idx < 0) {
              codes.push(code);
              sales.push(1);
              record.push(elem);
            } else {
              sales[idx] = sales[idx] + 1;
            }
          });
        });
        idx = 0
        let max = 0;
        for (let i = 0 ; i < sales.length ; i++) {
          if (sales[i] > max) {
            max = sales[i];
            idx = i;
          }
        };
        let result = {
          record: record[idx],
          status: 200
        }
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
}

module.exports = controller;