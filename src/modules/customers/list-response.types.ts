import { Customer } from './customers.entity';

export interface IListCustomerResponse {
  data: Customer[];
  count: number;
  page: number;
  limit: number;
}
