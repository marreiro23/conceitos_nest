import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number) // Transforma o valor para número, mesmo que venha como string na query
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number) // Transforma o valor para número, mesmo que venha como string na query
  offset: number;
}
