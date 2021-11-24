## **Documentación APIs**

Todos los endpoints se encuentran en la carpeta **src/controllers/api**.<br>
Salvo indicación, todos los endpoints son consumidos mediante un **GET**.<br>
Todos devuelven una respuesta en formato **JSON**.

## **Usuarios**<br>
Dispone de 2 endpoints:

### 1)  Obtener todos los usuarios

    Uso: /api/users/?rpp=<number>&page=<number>
    donde: rpp es la cantidad de registros por página
           page es la página que se desea obtener

    Out: {
          count: Cantidad de usuarios
          products: Array de usuarios
          status: Código de error
         }

### 2)  Obtener un usuario

    Uso: /api/users/<id>

    donde: rpp es la cantidad de registros por página
           page es la página que se desea obtener

    Out: {
          id: ID de usuario
          email: Dirección de correo
          first_name: Nombres
          last_name: Apellidos
          dni: DNI
          cell_phone: Teléfono celular
          address: Dirección
          zipcode: Código Postal
          city: Ciudad
          avatar: URL del avatar
          status: Código de error
         }

## **Productos**<br>
Dispone de 3 endpoints:

### 1)  Obtener todos los productos

    Uso: /api/products/?rpp=<number>&page=<number>
    donde: rpp es la cantidad de registros por página
           page es la página que se desea obtener

    Out: {
          count: Cantidad de productos
          products: Array de productos
          status: Código de error
         }

### 2)  Obtener un producto

    Uso: /api/products/:id

    Out: {
          id: ID de producto
          code: Código
          brand: Marca
          heading: Rubro
          model: Modelo
          family: Familia de producto
          desc: Descripción
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
          status: Código de error
         }

### 3)  Obtener la cantidad de productos por categoría

    Uso: /api/products/total

    Out: {
          count: Cantidad de productos
          countByCategory: Array de productos por categoría
          status: Código de error
         }

## **Carrito**<br>
Dispone de 10 endpoints:

### 1)  Obtener todos los registros de un usuario

    Uso: /api/cart/all/:userId

    Out: {
          count:   Cantidad de registros
          records: Array de registros
          status:  Código de error
         }

### 2)  Obtener un registro

    Uso: /api/cart/one/:id

    Out: {
          record: Registro
          status: Código de error
         }

### 3)  Agregar un registro al carrito

    Uso: /api/cart/add (Post)
    Debe informar el body (como parámetros del fetch/axios) con los campos a actualizar

### 4)  Actualizar un registro del carrito

    Uso: /api/cart/upd/:id (Post)
    Debe informar el body (como parámetros del fetch/axios) con los campos a actualizar

### 5)  Eliminar un registro del carrito

    Uso: /api/cart/del/:id (Post)

### 6)  Cancelar un registro del carrito

    Uso: /api/cart/can/:id (Post)

### 7)  Vaciar el carrito

    Uso: /api/cart/empty/:userId (Post)

### 8)  Facturar el carrito

    Uso: /api/cart/pay/:userId (Post)

### 9)  Sumar un producto

    Uso: /api/cart/moreOne/:id (Post)

### 10) Restar un producto

    Uso: /api/cart/lessOne/:id (Post)
