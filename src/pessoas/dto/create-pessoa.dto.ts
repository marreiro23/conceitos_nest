import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePessoaDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  passwordHash: string;
}
