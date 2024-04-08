class ApiError extends Error {
  constructor(
    stausCode,
    message = "Internal server error",
    errors = [],
    stack
  ) {
    super(message);
    this.stausCode = stausCode;
    this.errors = errors;
    this.message = message;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
