import { Module, forwardRef } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { RecadosController } from './recados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => RecadosModule),
  ],
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
