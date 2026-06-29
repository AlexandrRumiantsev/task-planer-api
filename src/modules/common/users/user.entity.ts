import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCommon {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  login: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  hashedPassword: string;
}