// renombrar archivo como config.js y cargar credenciales de la db

module.exports = {
    "development": {
      "username": "root",
      "password": "",
      "database": "sportal_db",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "sportal_db",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "sportal_db",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  