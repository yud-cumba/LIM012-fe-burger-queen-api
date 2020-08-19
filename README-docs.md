# Burger Queen HTTP/JSON API

Especificación de endpoints

## [`auth`](./module-auth.html)

## [`users`](./module-users.html)

## [`products`](./module-products.html)

## [`orders`](./module-orders.html)

### Node

* [x] Instalar y usar modules
* [x] `npm scripts`

### Express

* [x] Rutas
* [x] `middlewares`

### HTTP

* [x] Request
* [x] Response
* [ ] Headers
* [ ] Body
* [ ] Verbos HTTP
* [ ] Codigos de status de HTTP
* [ ] Encodings y `JSON`
* [ ] CORS

### Autenticación

* [ ] `JWT`
* [ ] Cómo guardar y validar contraseñas

### Testing

* [ ] Tests de integración
* [ ] Tests unitarios

### Frontend Development

* [ ] Variables de entorno
* [ ] `SSH`
* [ ] `SSH` keys
* [ ] Qué es un VPS

### MongoDB o MySQL (según corresponda)

* [ ] Instalación
* [ ] Conexión a través de cliente
* [ ] Connection string
* [ ] Comandos/Queries de creacion, lectura, modificación y eliminación

### Deployment

* [ ] Contenedores
* [ ] Qué es Docker
* [ ] Qué es Docker compose
* [ ] Uso de `docker-compose`

### Colaboración y Organización con Git y Github

* [ ] Forks
* [ ] Branches
* [ ] Pull Requests
* [ ] Tags
* [ ] Projects
* [ ] Issues
* [ ] Labels
* [ ] Milestones

### Buenas prácticas de desarrollo

* [ ] Modularización
* [ ] Nomenclatura / Semántica
* [ ] Linting


## 6. Pistas, tips y lecturas complementarias

* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [MySQL](https://www.mysql.com/)
* [docker](https://docs.docker.com/)
* [docker compose](https://docs.docker.com/compose/)
* [Postman](https://www.getpostman.com)
* [Variable de entorno - Wikipedia](https://es.wikipedia.org/wiki/Variable_de_entorno)
* [`process.env` - Node.js docs](https://nodejs.org/api/process.html#process_process_env)
* TODO: providers de VPS recomendados, idealmente con un free tier o muy baratos.
* [ssh](https://www.hostinger.es/tutoriales/que-es-ssh)

***

## 7 HTTP API Checklist

### 7.1 `/`

* [ ] `GET /`

### 7.2 `/auth`

* [ ] `POST /auth`

### 7.3 `/users`

* [ ] `GET /users`
* [ ] `GET /users/:uid`
* [ ] `POST /users`
* [ ] `PUT /users/:uid`
* [ ] `DELETE /users/:uid`

### 7.4 `/products`

* [ ] `GET /products`
* [ ] `GET /products/:productid`
* [ ] `POST /products`
* [ ] `PUT /products/:productid`
* [ ] `DELETE /products/:productid`

### 7.5 `/orders`

* [ ] `GET /orders`
* [ ] `GET /orders/:orderId`
* [ ] `POST /orders`
* [ ] `PUT /orders/:orderId`
* [ ] `DELETE /orders/:orderId`
