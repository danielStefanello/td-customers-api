import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @Column('decimal', { precision: 10, scale: 2 })
  companyValue: number;

  @Column({ default: false })
  selected: boolean;
}
