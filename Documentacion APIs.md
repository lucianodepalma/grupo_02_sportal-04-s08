** DOCUMENTACION APIs **

Todos los endpoints se encuentran en la carpeta ** /src/controllers/api **.
Salvo indicación, todos los endpoints son consumidos mediante un GET.
Todos devuelven una respuesta en formato JSON.

** Usuarios **
Dispone de 2 endpoints:

1)  Devuelve todos los usuarios

    Uso: /api/users/?rpp=<number>&page=<number>
    donde: rpp es la cantidad de registros por pagina
            page es la pagina que se desea obtener

    Out: {
          count: Cantidad de usuarios
          products: Array de usuarios
          status: Codigo de error
         }

2)  Devuelve un usuario

    Uso: /api/users/<id>

    donde: rpp es la cantidad de registros por pagina
          page es la pagina que se desea obtener

    Out: {
          id: ID de usuario
          email: Direccion de correo
          first_name: Nombres
          last_name: Apellidos
          dni: DNI
          cell_phone: Telefono celular
          address: Direccion
          zipcode: Codigo Postal
          city: Ciudad
          avatar: URL del avatar
          status: Codigo de error
         }

** Productos **
Dispone de 3 endpoints:

1)  Devuelve todos los productos

    Uso: /api/products/?rpp=<number>&page=<number>
    donde: rpp es la cantidad de registros por pagina
          page es la pagina que se desea obtener

    Out: {
          count: Cantidad de productos
          products: Array de productos
          status: Codigo de error
         }

2)  Devuelve un usuario

    Uso: /api/products/:id

    Out: {
          id: ID de producto
          code: Codigo
          brand: Marca
          heading: Rubro
          model: Modelo
          family: Familia de producto
          desc: Descripcion
          price: Precio
          age: Edad
          sex: Sexo
          color: Color
          image: URL de la imagen principal
          imageLeft: URL de la imagen lateral izquierda
          imageRight: URL de la imagen lateral derecha
          imageUpper: URL de la imagen superior
          imageLower: URL de la imagen inferior
          discontinued: Discontinuado
       // Colecciones
          brandsCollection: Marcas
          colorsCollection: Colores
          sexCollection: Sexo
          agesCollection: Edades
          headingsCollection: Rubros
          familiesCollection: Familias de producto
          status: Codigo de error
         }

3)  Devuelve un array con la cantidad de productos por categoria

    Uso: /api/products/total

    Out: {
          count: Cantidad de productos
          countByCategory: Array de productos por categoria
          status: Codigo de error
         }

** Carrito **
Dispone de 10 endpoints:

1)  Obtiene todos los registros de un usuario

    Uso: /api/cart/all/:userId

    Out: {
          count:   Cantidad de registros
          records: Array de registros
          status:  Codigo de error
         }

2)  Obtiene un registro

    Uso: /api/cart/one/:id

    Out: {
          record: Registro
          status: Codigo de error
         }

3)  Agrega un registro al carrito

    Uso: /api/cart/add (Post)
    Debe informar el body (como parametros del fetch/axios) con los campos a actualizar

4)  Actualiza un registro del carrito

    Uso: /api/cart/upd/:id (Post)
    Debe informar el body (como parametros del fetch/axios) con los campos a actualizar

5)  Elimina un registro del carrito

    Uso: /api/cart/del/:id (Post)

6)  Cancela un item del carrito

    Uso: /api/cart/can/:id (Post)

7)  Vacia el carrito

    Uso: /api/cart/empty/:userId (Post)

8)  Factura el carrito

    Uso: /api/cart/pay/:userId (Post)

9)  Suma un producto

    Uso: /api/cart/moreOne/:id (Post)

10) Resta un producto

    Uso: /api/cart/lessOne/:id (Post)