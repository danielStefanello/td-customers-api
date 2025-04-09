import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Customer } from '../../modules/customers/customers.entity';
import { faker } from '@faker-js/faker';

export default class CustomerSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Customer);

    const customers: Omit<Customer, 'id'>[] = Array(147)
      .fill(null)
      .map(() => ({
        name: faker.person.firstName(),
        salary: faker.number.int({ min: 700, max: 13000 }),
        companyValue: faker.number.int({ min: 10000, max: 1000000 }),
        selected: false,
      }));

    await repository.insert(customers);
  }
}
