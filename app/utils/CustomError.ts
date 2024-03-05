class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, code: number = 400) {
    super(message);
    this.name = "CustomError";
    this.statusCode = code;
  }
}

export default CustomError;
