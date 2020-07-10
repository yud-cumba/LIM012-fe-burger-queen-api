/* eslint-disable no-console */
const pagination = (pagesNumber, limitsNumber, result, table) => {
  const port = process.argv[2] || process.env.PORT || 8080;
  const pages = (!pagesNumber) ? 1 : pagesNumber;
  const limits = (!limitsNumber) ? result.length : limitsNumber;
  const startIndex = (pages - 1) * limits;
  const endIndex = pages * limits;
  const usersQueryLimits = result.slice(startIndex, endIndex);
  const totalPages = Math.round(result.length / limits);
  const previousPage = pages - 1;
  const nextPage = pages + 1;

  let link = `<https://localhost:${port}/${table}?page=1&limit=${limits}>; rel="first",<https://localhost:${port}/${table}?page=${totalPages}&limit=${limits}>; rel="last"`;
  const results = {
    link,
  };

  if (pages > 0 && pages < (totalPages + 1)) {
    const prev = `,<https://localhost:${port}/${table}?page=${previousPage}&limit=${limits}>; rel="prev",`;
    const next = `<https://localhost:${port}/${table}?page=${nextPage}&limit=${limits}>; rel="next"`;
    link = link.concat(prev, next);
    results.link = link;
    results.list = usersQueryLimits;
  }
  return results;
};

const dataError = (condicion, headers, _resp) => {
  if (condicion) {
    console.log('error, fin');
    return _resp.status(400).send('error');
  } if (headers) {
    return _resp.status(401).send('error');
  }
};

module.exports = {
  pagination,
  dataError,
};
