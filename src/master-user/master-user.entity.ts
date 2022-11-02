import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('master_user')
export class master_user extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, comment: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 45, comment: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 200, comment: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '수정일' })
  updatedAt: Date;
}
