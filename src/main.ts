import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão definidas no DTO
      forbidNonWhitelisted: true, // Lança um erro se houver propriedades não definidas no DTO
      transform: true, // Transforma os dados de entrada para os tipos definidos no DTO
    }),
  ); // Configura os pipes globais para validação e transformação de dados
  await app.listen(process.env.PORT ?? 3000); // Inicia o servidor na porta definida em process.env.PORT ou na porta 3000 por padrão
}
void bootstrap();
