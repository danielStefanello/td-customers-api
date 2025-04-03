import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {
    console.log('CustomerRepository:', customerRepository);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
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
