import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  salary: number;

  @Column()
  companyValue: number;

  @Column()
  selected: boolean;
}
