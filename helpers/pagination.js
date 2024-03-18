import config from '../config/config.js';

const getPaginationOptions = function (req) {
  const page = (req.query.page !== undefined) ? parseInt(req.query.page) : config.pagination.defaultPage;
  const limit = (req.query.pageSize !== undefined) ? parseInt(req.query.pageSize) : config.pagination.defaultLimit;

  return {
    page: page,
    limit: limit
  };
};

const setPaginationHeaders = function (res, result) {
  res.set('Pagination-Count', result.total);
  res.set('Pagination-Page', result.page);
  res.set('Pagination-Limit', result.limit);
};

const pagination = {
  getPaginationOptions,
  setPaginationHeaders
}
export default pagination;
