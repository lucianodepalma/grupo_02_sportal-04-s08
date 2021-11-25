// Productos

// In / Out File System
const db = require('../../database/models');
const { Op } = require("sequelize");

// Config
const config = require("../../controllers/config.js");

// Controller
const controller = {
  allProducts:
    // Devuelve todos los productos ordenados por fecha de ultima modificacion
    // Uso:   /api/products/?rpp=<number>&page=<number>&field=<opc>&value=<valor>
    // donde: rpp es la cantidad de registros por pagina
    //        page es la pagina que se desea obtener
    //        field es un string que identifica el campo por el que efectuara el filtrado
    //        value es el valor por el que debe filtrarse
    // Opc:   Las opciones son: age, brand, color, family, heading y sex.
    //        Si se informa field debe informarse value y viceversa.
    // Out:  {
    //        count: Cantidad de productos
    //        products: Array de productos
    //        status: Codigo de error
    //       }
    function (req, res) {
      let params = {};
      // Paginacion
      let rpp = (req.query.rpp ? req.query.rpp : 0);
      let page = (req.query.page ? req.query.page : 1);
      if (rpp > 0) {
        params = {
          limit: Number(rpp),
          offset: Number(rpp * (page - 1)),
        }
      }
      // Filtros
      let field = (req.query.field ? req.query.field : "");
      let valor = (req.query.value ? req.query.value : "");
      if (!(field == "" || valor == "")) {
        params.where = {};
        switch (field.toLowerCase()) {
          case "age":
            params.where["age_id"] = valor;
            break;
          case "brand":
            params.where["brand_id"] = valor;
            break;
          case "color":
            params.where["color_id"] = valor;
            break;
          case "family":
            params.where["family_id"] = valor;
            break;
          case "heading":
            params.where["heading_id"] = valor;
            break;
          case "sex":
            params.where["sex_id"] = valor;
            break;
        }
      }
      // Ordenamiento
      params.order = [['updated_at', 'DESC']];
      params.raw = true;
      // Productos y categorias
      db.Product.findAndCountAll(params)
      .then(function(products) {
        // Preparo array a devolver
        let productArray = [];
        products.rows.map(function (elem) {
          // Arma el OL del producto
          let product = {
            id: elem.id,
            name: elem.model,
            description: elem.desc,
            image: config.misc.urlSite + config.misc.pathImages + elem.image,
            price: elem.price,
            detail: config.misc.urlSite + "/api/products/" + elem.id
          }
          productArray.push(product);
        });
        // Completo el OL a devolver
        let result = {
          count: products.count,
          products: productArray,
          status: 200
        }
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  oneProduct:
    // Devuelve un usuario
    // Uso: /api/products/:id
    // Out: {
    //        id: ID de producto
    //        code: Codigo
    //        brand: Marca
    //        heading: Rubro
    //        model: Modelo
    //        family: Familia de producto
    //        desc: Descripcion
    //        price: Precio
    //        age: Edad
    //        sex: Sexo
    //        color: Color
    //        image: URL de la imagen principal
    //        imageLeft: URL de la imagen lateral izquierda
    //        imageRight: URL de la imagen lateral derecha
    //        imageUpper: URL de la imagen superior
    //        imageLower: URL de la imagen inferior
    //        discontinued: Discontinuado
    //        // Colecciones
    //        brandsCollection: Marcas
    //        colorsCollection: Colores
    //        sexCollection: Sexo
    //        agesCollection: Edades
    //        headingsCollection: Rubros
    //        familiesCollection: Familias de producto
    //        status: Codigo de error
    //      }
    function (req, res) {
      // Seleccion de todas las tablas involucradas.
      let product = db.Product.findByPk(req.params.id);
      let brands = db.Brand.findAll({order: [["desc", "ASC"]]});
      let colors = db.Color.findAll({order: [["desc", "ASC"]]});
      let sex = db.Sex.findAll({order: [["desc", "ASC"]]});
      let ages = db.Age.findAll({order: [["desc", "ASC"]]});
      let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
      let families = db.Family.findAll({order: [["desc", "ASC"]]});
      Promise.all([product, brands, colors, sex, ages, headings, families])
      .then(function([product, brands, colors, sex, ages, headings, families]){
        // Creacion de OL de las tablas involucradas con informacion minima
        brands = brands.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
            icon: config.misc.urlSite + config.misc.pathLogos + elem.icon
          }
          return newElem;
        });
        colors = colors.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        sex = sex.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        ages = ages.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        headings = headings.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        families = families.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        let record = {
          id: product.id,
          code: product.code,
          brand: product.brand_id,
          heading: product.heading_id,
          model: product.model,
          family: product.family_id,
          desc: product.desc,
          price: product.price,
          age: product.age_id,
          sex: product.sex_id,
          color: product.color_id,
          image: config.misc.urlSite + config.misc.pathImages + product.image,
          imageLeft: (product.image_left ? config.misc.urlSite + config.misc.pathImages + product.image_left : ""),
          imageRight: (product.image_right ? config.misc.urlSite + config.misc.pathImages + product.image_right : ""),
          imageUpper: (product.image_upper ? config.misc.urlSite + config.misc.pathImages + product.image_upper : ""),
          imageLower: (product.image_lower? config.misc.urlSite + config.misc.pathImages + product.image_lower : ""),
          discontinued: product.inactive,
          // Colecciones
          brandsCollection: brands,
          colorsCollection: colors,
          sexCollection: sex,
          agesCollection: ages,
          headingsCollection: headings,
          familiesCollection: families,
          status:200
        }
        res.status(200).json(record);
      })
      .catch(function (errMsg) {
        res.json(errMsg);
      });
    }
  ,
  totalByCategory:
    // Devuelve un array con la cantidad de productos por categoria
    // Uso: /api/products/total
    // Out: {
    //        count: Cantidad de productos
    //        countByCategory: Array de productos por categoria
    //        status: Codigo de error
    //      }
    function (req, res) {
      // Productos y categorias
      let products = db.Product.findAll();
      let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
      Promise.all([products, headings])
      .then(function([products, headings]) {
        // Inicializo contadores
        let headingArray = [];
        let olCount = {};
        headings.map(function (elem) {
          olCount = {
            id: elem.id,
            desc: elem.desc,
            count: 0
          }
          headingArray.push(olCount);
        });
        // Cuenta productos por categoria
        products.map(function (elem) {
          let idx = headingArray.findIndex(function (item) {
            return (elem.heading_id == item.id);
          });
          if (idx > -1) {
            headingArray[idx].count++
          }
        });
        // Completo el OL a devolver
        let result = {
          count: products.length,
          countByCategory: headingArray,
          status: 200
        }
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  searchProducts:
    // Efectúa una búsqueda de producto por modelo
    // Uso:   /api/products/search/?rpp=<number>&page=<number>&searchString=<valor>
    // donde: rpp es la cantidad de registros por pagina
    //        page es la pagina que se desea obtener
    //        searchString es el valor por el que debe efectuarse la búsqueda
    // Out:  {
    //        count: Cantidad de productos
    //        products: Array de productos
    //        status: Codigo de error
    //       }
    function (req, res) {
      let params = {
        where: {model: {[Op.like]: "%" + req.query.searchString + "%"}}
      };
      // Paginacion
      let rpp = (req.query.rpp ? req.query.rpp : 0);
      let page = (req.query.page ? req.query.page : 1);
      if (rpp > 0) {
        params.limit = Number(rpp);
        params.offset = Number(rpp * (page - 1));
      }
      // Ordenamiento
      params.order = [['updated_at', 'DESC']];
      params.raw = true;
      // Productos
      db.Product.findAndCountAll(params)
      .then(function(products) {
        // Preparo array a devolver
        let productArray = [];
        products.rows.map(function (elem) {
          // Arma el OL del producto
          let product = {
            id: elem.id,
            name: elem.model,
            description: elem.desc,
            image: config.misc.pathImages + elem.image,
            price: elem.price,
            detail: config.misc.urlSite + "/api/products/" + elem.id
          }
          productArray.push(product);
        });
        // Completo el OL a devolver
        let result = {
          count: products.count,
          products: productArray,
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