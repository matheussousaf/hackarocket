import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 100)
  name: string;

  @Length(4, 100)
  description: string;

  @Column()
  image: string;

  @Column()
  @Length(4, 100)
  category: string;

  @Column()
  price: number;

  @ManyToOne((type) => User, (user) => user.urlName)
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
