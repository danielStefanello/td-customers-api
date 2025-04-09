import { IsIn, IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class FindAllParams {
  pagination: PaginationDto;

  @IsOptional()
  @IsIn(['id', 'name', 'salary', 'companyValue'])
  sort?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: string;

  @IsOptional()
  filters?: {
    selected?: boolean;
  };
}
