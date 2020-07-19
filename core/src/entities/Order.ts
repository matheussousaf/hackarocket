import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
