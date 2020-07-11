// const query = require('../db-data/sql_functions');
const pool = require('../db-data/bq_data');
const { pagination } = require('../utils/utils');

module.exports = {
  getData: (req, resp, next, table) => {
    const { page, limit } = req.query;
    const pages = Number(page);
    const limits = Number(limit);
    pool.query(`SELECT * FROM ${table}`, (error, result) => {
      if (error) throw error;
      const response = pagination(pages, limits, result, table);
      // console.log(response);
      resp.header('link', response.link);
      if (response.list) {
        const jsonUserResp = response.list.map((x) => {
          const role = (x.rolesAdmin) || false;
          const id = (!x.id) ? 0 : (x.id).toString();
          return {
            _id: id,
            email: x.email,
            roles: { admin: role },
          };
        });
        const jsonProductsResp = response.list.map((x) => {
          const id = (!x.idProducts) ? 0 : (x.idProducts).toString();
          return {
            _id: id, // add toString();
            name: x.nameProduct,
            price: x.price,
            image: x.image,
            type: x.typeProduct,
            date: x.dateProduct,
          };
        });
        // eslint-disable-next-line no-console
        switch (table) {
          case 'users':
            return resp.status(200).send(jsonUserResp);
          case 'products':
            return resp.status(200).send(jsonProductsResp);
          default:
            break;
        }
      }
      return resp.status(404).send('Page not found');
    });
  },
};

/**
 * skills github, wix cv,(al final)
 * acerca de: dedicas experiencia proyectos fra,ework,
 * node.js CONOCIEMTOS EN JS FIREBASE CERT. SCRUMB
 * PROYECTOS: PERSONALES
 * experiencia trabajo
 * certificaciones
 * HISTORIA LOGROS
 */
