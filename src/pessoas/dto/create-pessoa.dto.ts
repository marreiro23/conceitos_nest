import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Unique } from 'typeorm';

export class CreatePessoaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  readonly nome: string;

  @IsString()
  @IsEmail()
  @Unique(['email'])
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly passwordHash: string;
  readonly nPessoa: string;
  readonly nPassword: string;
}
