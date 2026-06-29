import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString } from 'class-validator';

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  ID: string;

  @Column()
  TITLE: string;

  @Column()
  TEXT: string;

 @Column()
  DATE_START: string;

  @Column()
  DATE_END: string;
}