import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateRecadoDto {
  @IsOptional()
  @IsString()
  texto?: string;

  @IsPositive()
  deId: number;

  @IsPositive()
  paraId: number;
}

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(2)
//   de: string;

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(2)
//   para: string;
// }
