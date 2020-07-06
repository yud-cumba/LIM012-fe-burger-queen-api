// const query = require('../db-data/sql_functions');
const pool = require('../db-data/bq_data');


const links = (pages, limits, startIndex, endIndex) => {

};


module.exports = {
  getUsers: (req, resp, next) => {
    const { page, limit } = req.query;
    const pages = Number(page);
    const limits = Number(limit);
    pool.query('SELECT * FROM users', (error, result) => {
      if (error) throw error;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const users = result.slice(startIndex, endIndex);
      const link = {
        first: `/users?page=1&limit=${limits}`,
        last: `/users?page=${Math.round(result.length / limits)}&limit=${limits}`,
      };
      //  link.prev = `/users?page=${pages - 1}&limit=${limits}`;
      // link.next = `/users?page=${pages + 1}&limit=${limits}`;
      console.log(`
  elementos: ${result.length} 
  startIndex: ${startIndex} endIndex: ${endIndex} 
  pages: ${pages}
  limite: ${Math.round(result.length / limits)}
  path: /users?page=${pages}&limit=${limits}`);
      if (pages > 1 && pages < Math.round(result.length / limits)) {
        link.prev = `/users?page=${pages - 1}&limit=${limits}`;
        link.next = `/users?page=${pages + 1}&limit=${limits}`;
        console.log(link);
      } else {
        // const isNextOrPrev = pages < 0 ?
        console.log('fuera del limite');
      }


      resp.status(200).send(users);
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
