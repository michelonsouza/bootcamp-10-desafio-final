export default () => (req, res, next) => {
  function format(data, status = 200) {
    let body = { success: status >= 200 && status < 400 };

    if (Object.prototype.hasOwnProperty.call(data, 'count')) {
      body = {
        success: body.success,
        data: data.rows,
        pagination: {
          page: data.page,
          perPage: data.limit,
          total: data.count,
        },
      };
    } else {
      body[body.success ? 'data' : 'error'] = data;
    }

    return this.status(status).json(body);
  }

  res.format = format;
  return next();
};
