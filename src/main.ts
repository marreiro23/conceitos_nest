import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão definidas no DTO
      forbidNonWhitelisted: true, // Lança um erro se houver propriedades não definidas no DTO
      transform: false, // Transforma os dados de entrada para os tipos definidos no DTO
    }),
    new ParseIntIdPipe(), // Configura o ParseIntPipe para lançar um erro 400 em caso de falha de conversão
  );

  // app.useGlobalFilters(new MyExceptionFilter()); // Configura o filtro de exceção global

  await app.listen(3000);
}
void bootstrap();
