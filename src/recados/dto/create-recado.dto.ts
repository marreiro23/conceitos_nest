import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRecadoDto {
  @IsOptional()
  @IsString()
  texto?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  de: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  para: string;
}
