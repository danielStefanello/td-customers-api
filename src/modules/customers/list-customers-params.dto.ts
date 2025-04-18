import { IsIn, IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class ListCustomersParams {
  pagination: PaginationDto;

  @IsOptional()
  @IsIn(['id', 'name', 'salary', 'companyValue'])
  sort?: string = 'id';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: string = 'ASC';

  @IsOptional()
  filters?: {
    selected?: boolean;
  };
}
