export class CustomError extends Error {
  constructor(message, data = undefined) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    this.data = data;
  }
}
