#Poryecto e-commerce para curso de Backend II de Coderhouse

## Descripción

Este proyecto es un e-commerce de venta de productos de tecnología. Se desarrolló en el marco del curso de Backend II de Coderhouse.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Iniciar el servidor con `npm run dev`

----------------------------------------------------------------------------------------
Entrega Final:
TESTEO:

1. Registro de usuarios (POST /api/sessions/register)
Descripción: Registra un nuevo usuario en la base de datos. La contraseña se encripta automáticamente utilizando bcrypt.
Body (JSON):
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan.perez@example.com",
  "age": 30,
  "password": "password123",
  "role": "user"
}
respuesta esperada:
{
  "status": "ok",
  "user": {
    "_id": "id_del_usuario",
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan.perez@example.com",
    "age": 30,
    "password": "hashed_password",
    "role": "user",
    "__v": 0
  }
}

2-  Login de usuarios (POST /api/sessions/login)
Descripción: Permite a un usuario loguearse. Si las credenciales son correctas, genera un token JWT y lo almacena en una cookie HTTP-only.
Body (JSON)
{
  "email": "juan.perez@example.com",
  "password": "password123"
}
RESPUESTA ESPERADA: 
{
  "status": "ok",
  "message": "Login exitoso"
}

Nota: Verifica que se haya creado una cookie llamada jwt.


3. Obtener el usuario actual (GET /api/sessions/current)
Descripción: Devuelve los datos del usuario actual basado en el token JWT almacenado en la cookie.
Headers: La cookie jwt debe estar presente.
Descripción: Devuelve los datos del usuario actual basado en el token JWT almacenado en la cookie.
Headers: La cookie jwt debe estar presente.
Respuesta esperada:

{
  "status": "ok",
  "user": {
    "_id": "id_del_usuario",
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan.perez@example.com",
    "age": 30,
    "role": "user"
  }
}
Nota: En producción, el campo password no debería ser devuelto. Aquí se incluye solo para fines educativos.

4. Logout (POST /api/sessions/logout)
Descripción: Elimina la cookie jwt, desconectando al usuario.
Respuesta esperada:
{
  "status": "ok",
  "message": "Logout exitoso"
}


Cómo testear las funcionalidades
Paso 1: Registrar un usuario
Realiza una solicitud POST a /api/sessions/register con los datos del usuario.
Verifica que el usuario se haya creado correctamente en la base de datos (puedes usar MongoDB Compass o la consola de MongoDB).
Paso 2: Hacer login
Realiza una solicitud POST a /api/sessions/login con el email y la contraseña del usuario registrado.
Verifica que la respuesta sea "Login exitoso" y que se haya creado una cookie jwt.
Paso 3: Obtener el usuario actual
Realiza una solicitud GET a /api/sessions/current.
Verifica que los datos del usuario sean devueltos correctamente.
Paso 4: Logout
Realiza una solicitud POST a /api/sessions/logout.
Verifica que la cookie jwt haya sido eliminada.
Intenta acceder a /api/sessions/current nuevamente. Deberías recibir un error de autorización.


Modelo User
El modelo User tiene los siguientes campos:

first_name (String, requerido)
last_name (String, requerido)
email (String, único, requerido)
age (Number, requerido)
password (String, encriptado con bcrypt)
cart (ObjectId, referencia a Carts)
role (String, por defecto: 'user')
Notas importantes
Seguridad: En producción, nunca devuelvas el campo password en las respuestas.
Token JWT: El token tiene una validez de 1 hora. Si expira, el usuario deberá hacer login nuevamente.
Cookie HTTP-only: La cookie jwt no es accesible desde JavaScript del lado del cliente, lo que mejora la seguridad.