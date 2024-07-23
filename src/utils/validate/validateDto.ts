import { validate } from 'class-validator';
import { CustomHttpException } from '../errors/CustomException';
import { HttpStatus } from '@nestjs/common';

export async function validateDto(dto: any) {
  const errors = await validate(dto);
  if (errors.length > 0) {
    const messages = errors.map((error) =>
      Object.values(error.constraints).join(', '),
    );
    throw new CustomHttpException(messages.join('; '), HttpStatus.BAD_REQUEST);
  }
}
