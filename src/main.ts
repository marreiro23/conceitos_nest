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
  await app.listen(process.env.PORT ?? 3000); // Inicia o servidor na porta definida em process.env.PORT ou na porta 3000 por padrão
}
void bootstrap();
