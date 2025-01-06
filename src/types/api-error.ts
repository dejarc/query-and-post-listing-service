export class ApiError extends Error {
  message: string;
  statusCode: number;
  context: Array<string>;
  constructor({
    message,
    statusCode,
    context,
  }: {
    message: string;
    statusCode: number;
    context: Array<string>;
  }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.context = context;
  }
}
