export type HTTPMethods = "post" | "get" | "put" | "delete" | "patch";

export type HTTPStatus = {
  title: string;
  message?: string;
}

export type HTTPResponse<T> = {
  error: HTTPStatus | null;
  success: HTTPStatus | null;
  code: number;
  data: T | null;
}