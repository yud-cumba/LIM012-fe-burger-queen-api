const pagination = (pagesNumber, limits, result, table) => {
  const port = process.argv[2] || process.env.PORT || 8080;
  const pages = (!pagesNumber) ? 1 : pagesNumber;
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
    const prev = `,<https://localhost:${port}/${table}?page=${previousPage}&limit=${limits}>; rel="previous",`;
    const next = `<https://localhost:${port}/${table}?page=${nextPage}&limit=${limits}>; rel="next"`;
    link = link.concat(prev, next);
    results.link = link;
    results.list = usersQueryLimits;
  } else if (!limits) {
    results.list = result;
  }
  // eslint-disable-next-line no-console
  console.log(results.link);
  return results;
};

const dataError = (condicion, headers, _resp) => {
  if (condicion) {
    return _resp.status(400);
  } if (headers) {
    return _resp.status(401);
  }
};

module.exports = {
  pagination,
  dataError,
};
