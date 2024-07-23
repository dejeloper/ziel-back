import { HttpStatus } from '@nestjs/common';

export function CustomResponse(
  status: HttpStatus,
  message: string,
  data: unknown,
  success: boolean,
) {
  return {
    status,
    message,
    data,
    success,
  };
}
