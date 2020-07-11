/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');

const { getData } = require('../controller/users');

const {
  getDataByKeyword, postData, updateDataByKeyword, deleteData,
} = require('../db-data/sql_functions');

const { dataError } = require('../utils/utils');

/** @module products */
module.exports = (app, nextMain) => {
  /**
   * @name GET /products
   * @description Lista productos
   * @path {GET} /products
   * @query {String} [page=1] Página del listado a consultar
   * @query {String} [limit=10] Cantitad de elementos por página
   * @header {Object} link Parámetros de paginación
   * @header {String} link.first Link a la primera página
   * @header {String} link.prev Link a la página anterior
   * @header {String} link.next Link a la página siguiente
   * @header {String} link.last Link a la última página
   * @auth Requiere `token` de autenticación
   * @response {Array} products
   * @response {String} products[]._id Id
   * @response {String} products[].name Nombre
   * @response {Number} products[].price Precio
   * @response {URL} products[].image URL a la imagen
   * @response {String} products[].type Tipo/Categoría
   * @response {Date} products[].dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   */

  app.get('/products', requireAuth, (req, resp, next) => getData(req, resp, next, 'products'));

  /**
   * @name GET /products/:productId
   * @description Obtiene los datos de un producto especifico
   * @path {GET} /products/:productId
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.get('/products/:id', requireAuth, (req, resp, next) => {
    const { id } = req.params;
    if (!(id) || !req.headers.authorization) {
      // dataError(!id, !req.headers.authorization, resp);
      return dataError(!id, !req.headers.authorization, resp);
    }
    getDataByKeyword('products', 'idProducts', id)
      .then((result) => {
        console.log(typeof (result[0].idProducts).toString());
        console.log(typeof result[0].price);
        return resp.status(200).send(
          {
            _id: (result[0].idProducts).toString(),
            name: result[0].nameProduct,
            price: result[0].price,
            image: result[0].image,
            type: result[0].typeProduct,
            date: result[0].dateProduct,
          },
        );
      })
      .catch(() => resp.status(404).send({ message: 'El producto solicitado no existe' }));
  });

  /**
   * @name POST /products
   * @description Crea un nuevo producto
   * @path {POST} /products
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @body {String} name Nombre
   * @body {Number} price Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} products._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican `name` o `price`
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto ya existe
   */
  app.post('/products', requireAdmin, (req, resp, next) => {
    const {
      name, price, image, type,
    } = req.body;
    if (!(name && price) || !req.headers.authorization) {
      // console.log(dataError(!(name && price), !req.headers.authorization, resp));
      return dataError(!(name && price), !req.headers.authorization, resp);
    }
    const date = new Date();

    const newProduct = {
      nameProduct: name,
      price,
      image,
      typeProduct: type,
      dateProduct: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    };
    getDataByKeyword('products', 'nameProduct', name)
      .then(() => resp.status(404).send({ message: `Ya existe un producto con el nombre: ${name}` }))
      .catch(() => {
        postData('products', newProduct)
          .then((result) => resp.status(200).send(
            {
              _id: (result.insertId).toString(),
              name: newProduct.nameProduct,
              price,
              image,
              type,
              date: newProduct.dateProduct,
            },
          ));
      });
  });

  /**
   * @name PUT /products
   * @description Modifica un producto
   * @path {PUT} /products
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación y que el usuario sea **admin**
   * @body {String} [name] Nombre
   * @body {Number} [price] Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican ninguna propiedad a modificar
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `productId` indicado no existe
   */

  app.put('/products/:id', requireAdmin, (req, resp, next) => {
    const { id } = req.params;
    const {
      name, price, image, type,
    } = req.body;
    const date = new Date();
    console.log(!(name || price || image || type));
    console.log(price);
    if (!(name || price || image || type) || !req.headers.authorization) {
      console.log(':v');
      return dataError(!(name && price), !req.headers.authorization, resp);
    // eslint-disable-next-line no-restricted-globals
    } if (isNaN(price) && price !== undefined) {
      return resp.status(400).send('Price have to do a number');
    }
    const newProduct = {
      dateProduct: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    };
    if (name) {
      newProduct.nameProduct = name;
    } if (type) {
      newProduct.typeProduct = type;
    } if (price) {
      newProduct.price = price;
    } if (image) {
      newProduct.image = image;
    }
    getDataByKeyword('products', 'idProducts', id)
      .then((product) => {
        updateDataByKeyword('products', newProduct, 'idProducts', id)
          .then(() => {
            getDataByKeyword('products', 'idProducts', id)
              .then((product) => resp.status(200).send(
                {
                  _id: id.toString(),
                  name: product[0].nameProduct,
                  price: product[0].price,
                  image: product[0].image,
                  type: product[0].typeProduct,
                  date: newProduct.dateProduct,
                },
              ));
          });
      })
      .catch(() => resp.status(404).send({ message: `No existe producto con ese id : ${id}` }));
  });

  /**
   * @name DELETE /products
   * @description Elimina un producto ✓
   * @path {DELETE} /products ✓
   * @params {String} :productId `id` del producto ✓
   * @auth Requiere `token` de autenticación y que el usuario sea **admin**
   * @response {Object} product✓
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación  ✓
   * @code {200} si la autenticación es correcta ✓
   * @code {401} si no hay cabecera de autenticación ✓
   * @code {403} si no es ni admin ✓
   * @code {404} si el producto con `productId` indicado no existe ✓
   */
  app.delete('/products/:id', requireAdmin, (req, resp, next) => {
    const { id } = req.params;
    if (!id || !req.headers.authorization) {
      // console.log(dataError(!(name && price), !req.headers.authorization, resp));
      return dataError(!id, !req.headers.authorization, resp);
    }
    const productDeleted = {
      _id: id,
    };
    getDataByKeyword('products', 'idProducts', id)
      .then((product) => {
        productDeleted.name = product[0].nameProduct;
        productDeleted.price = product[0].price;
        productDeleted.image = product[0].image;
        productDeleted.type = product[0].typeProduct;
        productDeleted.dateEntry = product[0].dateProduct;
        deleteData('products', 'idProducts', id);
        return resp.status(200).send(productDeleted);
        // resp.status(403).send({ message: `El producto con id ${id} no existe.` });
      })
      .catch(() => resp.status(404).send({ message: `No existe el producto con id ${id}.` }));
  });
  nextMain();
};
