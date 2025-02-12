Este proyecto es una **API web en Node.js** para gestionar una **tienda en línea**, enfocada en la venta de productos y la administración de usuarios. Está dividido en dos roles principales:  

1. **Administrador** 🛠️  
   - Gestiona productos (crear, editar, eliminar, listar).  
   - Maneja categorías de productos.  
   - Administra usuarios (cambiar roles, editar información).  
   - Controla facturas y pedidos.  

2. **Cliente** 🛒  
   - Se registra e inicia sesión.  
   - Explora productos y categorías.  
   - Agrega productos al carrito de compras.  
   - Finaliza compras y recibe facturas.  
   - Puede ver su historial de compras y administrar su perfil.  

---

### 🏗 **Tecnologías utilizadas**  
- **Node.js** con **Express.js** como framework web.  
- **MongoDB** con **Mongoose** como base de datos.  
- **JWT (jsonwebtoken)** para autenticación.  
- **Multer** para subir imágenes de productos.  
- **Swagger** para documentar la API.  
- **Helmet y Express Rate Limit** para seguridad.  

---

### 🔥 **Flujo de compra**
1. El cliente **explora productos** y **agrega** al carrito.  
2. Procede a **comprar**, generando una factura.  
3. El administrador puede **ver y gestionar pedidos**.  

---

### 🔐 **Seguridad y Autenticación**
- **`argon2`** → Para **hashear y verificar contraseñas** de los usuarios de manera segura.  
  📌 *Uso:* Cuando un usuario se registra, su contraseña se cifra antes de guardarla en la base de datos.  

- **`jsonwebtoken`** → Para **manejar autenticación con JWT (JSON Web Tokens)**.  
  📌 *Uso:* Se genera un token cuando un usuario inicia sesión, y se usa para autenticar sus solicitudes.  

- **`helmet`** → Añade **capas de seguridad HTTP** a Express.  
  📌 *Uso:* Protege contra ataques como **XSS, Clickjacking y Sniffing** añadiendo cabeceras HTTP seguras.  

---

### 🌐 **Middleware y Control de Solicitudes**
- **`cors`** → Permite **controlar qué dominios pueden acceder a la API**.  
  📌 *Uso:* Se habilita para permitir peticiones desde el frontend o clientes externos.  

- **`express-rate-limit`** → Limita la cantidad de **peticiones por IP** para evitar ataques de fuerza bruta o DDoS.  
  📌 *Uso:* Se configura para limitar, por ejemplo, a **100 solicitudes por minuto** por usuario.  

- **`express-validator`** → Facilita **la validación de datos en las solicitudes**.  
  📌 *Uso:* Se usa para asegurarse de que los datos enviados (email, contraseña, etc.) sean correctos antes de procesarlos.  

---

### 🛢 **Base de Datos**
- **`mongoose`** → Biblioteca para **interactuar con MongoDB** usando modelos y esquemas.  
  📌 *Uso:* Definir y manejar modelos como `User`, `Product`, `Facture`, etc.  

---

### 📝 **Logging y Gestión de Datos**
- **`morgan`** → Registra **las solicitudes HTTP** en la terminal para depuración.  
  📌 *Uso:* Muestra detalles de cada petición como método, URL, tiempo de respuesta, etc.  

- **`multer`** → Permite **subir archivos** como imágenes de productos.  
  📌 *Uso:* Se usa cuando un administrador sube fotos para los productos.  

- **`date-fns`** → Manejo avanzado de **fechas** y tiempos.  
  📌 *Uso:* Para calcular fechas de facturas, mostrar tiempos en el historial de compras, etc.  

---

### 📄 **Documentación de la API**
- **`swagger-jsdoc`** → Genera documentación OpenAPI a partir de comentarios en el código.  
  📌 *Uso:* Define los endpoints y parámetros de la API en un formato estructurado.  

- **`swagger-ui-express`** → Permite mostrar la documentación Swagger en una URL amigable.  
  📌 *Uso:* Los desarrolladores pueden probar la API en `http://localhost:3000/api-docs`.  

---
