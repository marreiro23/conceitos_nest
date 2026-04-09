import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); // Inicia o servidor na porta definida em process.env.PORT ou na porta 3000 por padrão
}
void bootstrap();
