export default (req, res, next) => {
  function format(data, status = 200) {
    const body = { success: status >= 200 && status < 400 };
    body[body.success ? 'data' : 'errors'] = data;
    return res.status(status).json(body);
  }

  res.format = format;
  return next();
};
