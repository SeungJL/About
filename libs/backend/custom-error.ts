export abstract class CustomError extends Error {
  abstract status: number;

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  status = 401;
  constructor(message: string) {
    super(message);
  }
}
