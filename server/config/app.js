const vars = {
  GOOGLE_CLIENT_ID: process.env["GOOGLE_CLIENT_ID"],
  GOOGLE_CLIENT_SECRERT: process.env["GOOGLE_CLIENT_SECRERT"],
};

class AppResponse {
  constructor(data, message, code, error) {
    this.data = data;
    this.message = message;
    this.code = code;
    this.error = error;
  }

  static create(data, message, code) {
    return new AppResponse(data, message || "", code || 200, false);
  }

  static createError(data, message, code) {
    return new AppResponse(data, message, code, true);
  }
}

function errorMiddleware(err, _req, res, _next) {
  if (!(err instanceof AppResponse))
    err = AppResponse.createError(null, 'Something went wrong!', 500);
  res.status(err.code).json(err);
}

module.exports = {
  AppResponse,
  errorMiddleware,
  vars
};