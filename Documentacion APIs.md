## **Documentación APIs**

Todos los endpoints se encuentran en la carpeta **src/controllers/api**.<br>
Salvo indicación, todos los endpoints son consumidos mediante un **GET**.<br>
Todos devuelven una respuesta en formato **JSON**.

## **Usuarios**<br>

### Obtener todos los usuarios ordenados por apellido y nombre

    Uso: /api/users/?rpp=<number>&page=<number>
    donde: rpp es la cantidad de registros por página
           page es la página que se desea obtener

    Out: {
          count: Cantidad de usuarios
          products: Array de usuarios
          status: Código de error
         }

### Obtener un usuario

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

### Obtener todos los productos ordenados por fecha de última modificación

    Uso:   /api/products/?rpp=<number>&page=<number>&field=<opc>&value=<valor>
    donde: rpp es la cantidad de registros por pagina
           page es la pagina que se desea obtener
           field es un string que identifica el campo por el que efectuara el filtrado
           value es el valor por el que debe filtrarse

    Opc:   Las opciones son: age, brand, color, family, heading y sex.
           Si se informa field debe informarse value y viceversa.

    Out:  {
           count: Cantidad de productos
           products: Array de productos
           status: Código de error
          }

### Obtener un producto

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

### Obtener la cantidad de productos por categoría

    Uso: /api/products/total

    Out: {
          count: Cantidad de productos
          countByCategory: Array de productos por categoría
          status: Código de error
         }

### Buscar productos por modelo ordenados por fecha de última modificación

    Uso:   /api/products/search/?rpp=<number>&page=<number>&searchString=<valor>
    donde: rpp es la cantidad de registros por pagina
           page es la pagina que se desea obtener
           searchString es el valor por el que debe efectuarse la búsqueda
    Out:  {
           count: Cantidad de productos
           products: Array de productos
           status: Codigo de error
          }

## **Carrito**<br>

### Obtener todos los registros de un usuario ordenados por fecha de última modificación

    Uso: /api/cart/all/:userId

    Out: {
          count:   Cantidad de registros
          records: Array de registros
          status:  Código de error
         }

### Obtener un registro

    Uso: /api/cart/one/:id

    Out: {
          record: Registro
          status: Código de error
         }

### Agregar un registro al carrito

    Uso: /api/cart/add (Post)
    Debe informar el body (como parámetros del fetch/axios) con los campos a actualizar

### Actualizar un registro del carrito

    Uso: /api/cart/upd/:id (Post)
    Debe informar el body (como parámetros del fetch/axios) con los campos a actualizar

### Eliminar un registro del carrito

    Uso: /api/cart/del/:id (Post)

### Cancelar un registro del carrito

    Uso: /api/cart/can/:id (Post)

### Vaciar el carrito

    Uso: /api/cart/empty/:userId (Post)

### Facturar el carrito

    Uso: /api/cart/pay/:userId (Post)

### Sumar un producto

    Uso: /api/cart/moreOne/:id (Post)

### Restar un producto

    Uso: /api/cart/lessOne/:id (Post)
