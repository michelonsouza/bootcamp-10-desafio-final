class ResponseError extends Error {
  constructor(message, status) {
    super(JSON.stringify(message));
    this.name = 'ResponseError';
    this.status = Number(status);
    this.data = message;
    Error.captureStackTrace(this, ResponseError);
  }
}
global.ResponseError = ResponseError;
