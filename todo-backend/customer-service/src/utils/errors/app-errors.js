export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {
  constructor(
    name,
    statusCode,
    description
    // isOperational,
    // errorStack,
    // logingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    // this.isOperational = isOperational;
    // this.errorStack = errorStack;
    // this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//500
export class APIError extends AppError {
  constructor(description = "Internal Server Error") {
    super(STATUS_CODES.INTERNAL_ERROR, description);
  }
}

//403
export class AuthorizeError extends AppError {
  constructor(description = "Access-Denied") {
    super("Access-Denied", STATUS_CODES.BAD_REQUEST, description);
  }
}

// 404
export class NotfoundError extends AppError {
  constructor(description = "Not Found") {
    super("Not-Found", STATUS_CODES.NOT_FOUND, description);
  }
}

//400
export class ValidationError extends AppError {
  constructor(description = "Validation Error") {
    super("BAD REQUEST", STATUS_CODES.BAD_REQUEST, description);
  }
}
