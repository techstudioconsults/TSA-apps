declare global {
  /** The Techstudio API wraps every response as { success, data, message } */
  interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
  }
}

export {};
