import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'Customer name',
    example: 'John Doe',
  })
  name: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Salary of customer',
    example: 123.45,
  })
  salary: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Company valuation',
    example: 99999999.99,
  })
  companyValue: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Define if customer is selected',
    example: true,
  })
  selected: boolean;
}
