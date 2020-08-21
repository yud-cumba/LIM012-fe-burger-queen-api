/* eslint-disable no-param-reassign */
const { pagination } = require('../utils/utils');
const { getAllData, getDataByKeyword } = require('../db-data/sql_functions');

module.exports = {
  getData: (req, resp, next, table) => {
    const { page, limit } = req.query;
    const pages = Number(page);
    const limits = Number(limit);
    getAllData(table)
      .then((result) => {
        const response = pagination(pages, limits, result, table);
        resp.header('link', response.link);
        console.log(response.list);
        if (response.list) {
          const jsonUserResp = response.list.map((x) => {
            const role = (x.rolesAdmin) || false;
            const id = (!x._id) ? 0 : (x._id).toString();
            return {
              _id: id,
              email: x.email,
              roles: { admin: role },
            };
          });
          // eslint-disable-next-line array-callback-return
          const jsonProductResp = response.list.map((x) => {
          // eslint-disable-next-line no-param-reassign
            x._id = (!x._id) ? 0 : (x._id).toString();
            return x;
          });
          const jsonOrderResp = response.list.map((x) => {
            x._id = (!x._id) ? 0 : (x._id).toString();
          });
          // eslint-disable-next-line no-console
          switch (table) {
            case 'users':
              return resp.status(200).send(jsonUserResp);
            case 'products':
              return resp.status(200).send(jsonProductResp);
            case 'orders':
              return resp.status(200).send(jsonOrderResp);
            default:
              break;
          }
        }
        return resp.status(404).send('Page not found');
      });
  },
};
