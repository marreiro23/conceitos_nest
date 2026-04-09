import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function inicia() {
  const aplicativo = await NestFactory.create(AppModule);
  await aplicativo.listen(process.env.PORT ?? 3000); // Inicia o servidor na porta definida em process.env.PORT ou na porta 3000 por padrão
}
inicia();
