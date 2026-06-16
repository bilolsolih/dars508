import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  fullName: string;

  @Column({ length: 64, unique: true })
  login: string;

  @Column({ length: 128 })
  password: string;
}
