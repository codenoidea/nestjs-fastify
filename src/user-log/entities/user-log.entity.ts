import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_log')
export class UserLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, comment: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 45, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 45, comment: '전화번호' })
  phone: string;

  @Column({ type: 'varchar', length: 10, comment: '구분' })
  gubun: string;

  @Column({ name: 'created_at', comment: '생성일' })
  createdAt: Date;
}
