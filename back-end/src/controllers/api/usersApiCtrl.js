// Usuarios

// In / Out File System
const db = require('../../database/models');

// Config
const config = require("../../controllers/config.js");

// Controller
const controller = {
  // Devuelve todos los usuarios
  allUsers:
    // Uso: /api/users/?rpp=<number>&page=<number>
    // donde: rpp es la cantidad de registros por pagina
    //        page es la pagina que se desea obtener
    // Out: {
    //        count: Cantidad de usuarios
    //        products: Array de usuarios
    //        status: Codigo de error
    //      }
    function (req, res) {
      // Paginacion
      let rpp = (req.query.rpp ? req.query.rpp : 0);
      let page = (req.query.page ? req.query.page : 1);
      let params = {};
      if (rpp > 0) {
        params = {
          limit: Number(rpp),
          offset: Number(rpp * (page - 1))
        }
      }
      // Seleccion
      db.User.findAndCountAll(params)
      .then(function(records) {
        let result = {};
        let userArray = [];
        records.rows.map(function (elem) {
          let user = {
            id: elem.id,
            email: elem.email,
            name: elem.last_name + " " + elem.first_name,
            detail: config.misc.urlSite + "/api/users/" + elem.id
          }
          userArray.push(user);
        });
        result.count = records.count;
        result.users = userArray;
        result.status = 200;
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  // Devuelve un usuario
  oneUser:
    // Uso: /api/users/<id>
    // donde: rpp es la cantidad de registros por pagina
    //        page es la pagina que se desea obtener
    // Out: {
    //        id: ID de usuario
    //        email: Direccion de correo
    //        first_name: Nombres
    //        last_name: Apellidos
    //        dni: DNI
    //        cell_phone: Telefono celular
    //        address: Direccion
    //        zipcode: Codigo Postal
    //        city: Ciudad
    //        avatar: URL del avatar
    //        status: Codigo de error
    //      }
    function (req, res) {
      db.User.findByPk(req.params.id)
      .then(function (result) {
        let record = {
          id: result.id,
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          dni: result.dni,
          cell_phone: result.cell_phone,
          address: result.address,
          zipcode: result.zipcode,
          city: result.city,
          avatar: config.misc.urlSite + config.misc.pathAvatar + result.avatar,
          status: 200
        }
        res.status(200).json(record);
      })
      .catch(function (errMsg) {
        res.json(errMsg);
      });
    }
}

module.exports = controller;