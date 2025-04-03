import {
  IsString,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsNumber()
  @Min(0)
  companyValue: number;
}
