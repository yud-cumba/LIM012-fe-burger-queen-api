const pagination = (pages, limits, result) => {
  const startIndex = (pages - 1) * limits;
  const endIndex = pages * limits;
  const usersQueryLimits = result.slice(startIndex, endIndex);
  const totalPages = Math.round(result.length / limits);
  const previousPage = pages - 1;
  const nextPage = pages + 1;

  const link = {
    first: `/users?page=1&limit=${limits}`,
    last: `/users?page=${totalPages}&limit=${limits}`,
  };

  const results = {
    link,
  };
  if (pages > 0 && pages < (totalPages + 1)) {
    link.prev = `/users?page=${previousPage}&limit=${limits}`;
    link.next = `/users?page=${nextPage}&limit=${limits}`;
    results.list = usersQueryLimits;
  } else if (!limits) {
    results.list = result;
  } else if (!pages) {
    results.list = result.slice(0, limits);
  }
  return results;
};

const dataError = (condicion, headers, req) => {
  if (condicion) {
    return req.status(400);
  } if (headers) {
    return req.status(401);
  }
};

module.exports = {
  pagination,
  dataError,
};
