import { ApiResponse }
from '../interfaces/api-response.interface';

export class ErrorResponse {

  static send(
    message: string,
    error: any,
  ): ApiResponse<null> {

    return {

      success: false,

      message,

      error,

      timestamp: new Date().toISOString(),
    };
  }
}