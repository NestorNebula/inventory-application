interface CustomError extends Error {
  message: string;
  statusCode: number;
  title?: string;
}

export { CustomError };
