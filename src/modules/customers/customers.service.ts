import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Customer } from './customers.entity';
import { ListCustomersParams } from './list-customers-params.dto';
import { IListCustomerResponse } from './list-response.types';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {
    console.log('CustomerRepository:', customerRepository);
  }

  async findAll(params: ListCustomersParams): Promise<IListCustomerResponse> {
    const { pagination, sort, order, filters } = params;
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const where = { selected: false };
    if (filters && filters.selected) {
      where.selected = true;
    }

    const orderOptions = {};
    if (sort && order) {
      orderOptions[sort] = order;
    } else {
      orderOptions['id'] = 'ASC';
    }

    const findOptions: FindManyOptions<Customer> = {
      where,
      order: orderOptions,
      skip,
      take: limit,
    };

    const [data, count] =
      await this.customerRepository.findAndCount(findOptions);

    return { data, count, limit, page };
  }

  async findOne(id: number): Promise<Customer | null> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!customer) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'customer not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return customer;
  }

  async create(customer: Customer): Promise<Customer> {
    return this.customerRepository.save(customer);
  }

  async update(id: number, updateCustomer: Partial<Customer>) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'customer not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    Object.assign(customer, updateCustomer);
    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!customer) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'customer does not exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.customerRepository.delete(id);
  }
}
