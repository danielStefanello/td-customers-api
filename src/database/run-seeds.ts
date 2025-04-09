import { DataSource } from 'typeorm';
import CustomerSeeder from './seeds/customer.seed';

async function runSeeds() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'tdCustomer',
    password: 'tdCustomer',
    database: 'tdCustomer',
    entities: ['src/**/*.entity.ts'],
    synchronize: true,
  });

  await dataSource.initialize();

  try {
    await dataSource.synchronize(true);

    const customerSeeder = new CustomerSeeder();
    await customerSeeder.run(dataSource);

    console.log('Seeds executados com sucesso!');
  } catch (error) {
    console.error('Erro ao executar seeds:', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeeds().catch(console.error);
