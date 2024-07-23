import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Ziel API')
  .setDescription('API para gestionar objetivos con Ziel')
  .setVersion('1.0')
  .addTag('Ziel api')
  .build();

export const pathSwagger = 'api';
