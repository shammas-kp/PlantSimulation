import { ApiResponse }
from '../interfaces/api-response.interface';

export class SuccessResponse {

  static send<T>(
    message: string,
    data: T,
  ): ApiResponse<T> {

    return {

      success: true,

      message,

      data,

      timestamp: new Date().toISOString(),
    };
  }
}