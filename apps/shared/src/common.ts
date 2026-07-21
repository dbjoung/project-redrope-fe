export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export interface PaginationResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalCount: number;
}
