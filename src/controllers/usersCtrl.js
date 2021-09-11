// Usuarios

// In / Out File System
const rwdJson = require("./rwd-json.js");

//Requerimos de validaciones
const { validationResult } = require ('express-validator');

// JSON path
const usersJson = "../../data/users.json";

/* JSON Layout
usuario   : e-mail (X)
password  : Contraseña (X)
nombre    : Nombres (X)
apellido  : Apellidos (X)
dni       : DNI (N)
celular   : Celular (N)
direccion : Direccion (X)
cp        : Codigo Postal (X)
localidad : Localidad (X)
*/

// Controller

const controller = {
  // Muestra formulario de Registro
  create:
    function (req, res) {
      res.render("register");
    }
  ,
  // Crea un nuevo usuario
  store:
    function (req, res) {
      let validacionDeErrores = validationResult(req);
      if (validacionDeErrores.errors.length > 0) {
        return res.render ('register', { 
          errors: validacionDeErrores.mapped(),
          oldData: req.body
        })
      } else {
        let usuarios = [];
        let usuario = req.body.usuario;
        usuarios = rwdJson.readJSON(usersJson);
        let itemUsuario;
        if (usuarios != undefined) {
          itemUsuario = usuarios.find(function (item) {
            return (usuario == item.usuario);
          });
        }
        if (itemUsuario == null) {
          if (req.body.password == req.body.checkPassword) {
            let newItem = {
              usuario: req.body.usuario,
              password: req.body.password,
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              dni: req.body.dni,
              celular: req.body.celular,
              direccion: req.body.direccion,
              cp: req.body.cp,
              localidad: req.body.localidad
            }
            if (usuarios == undefined) {
              let usuarios = [];
              usuarios.push(newItem);
              rwdJson.writeJSON(usersJson, usuarios, false);
            } else {
              usuarios.push(newItem);
              rwdJson.writeJSON(usersJson, usuarios, false);
            }
            res.redirect ("/login");
          }
        }
      }
    }
}

module.exports = controller;