export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data?: T;
  error?: {
    message: string;
    stack?: string;
  };
}
