import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  full_name: string;

  @Column({ type: 'varchar', length: 45 })
  phone_number: string;

  @Column({ type: 'varchar', length: 45 })
  companyName: string;

  @Column({ type: 'varchar', length: 45 })
  position: string;

  @Column()
  created_at: Date;

  @Column()
  password: string;
}
