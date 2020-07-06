// const query = require('../db-data/sql_functions');
const pool = require('../db-data/bq_data');
const pagination = require('../utils/utils');

module.exports = {
  getData: (req, resp, next, table) => {
    const { page, limit } = req.query;
    const pages = Number(page);
    const limits = Number(limit);
    pool.query(`SELECT * FROM ${table}`, (error, result) => {
      if (error) throw error;
      const response = pagination(pages, limits, result);
      resp.header('Pagination', response.link);
      if (response.list) {
        resp.status(200).send(response.list);
      } else {
        resp.status(404).send('Page not found');
      }
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
