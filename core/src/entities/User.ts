import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Unique,
  OneToMany,
} from "typeorm";
import { Length } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Product } from "./Product";

@Entity()
@Unique(["email", "urlName"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 100)
  name: string;

  @Column()
  @Length(4, 100)
  image: string;

  @Column()
  @Length(4, 100)
  type: string;

  @Column({ unique: true })
  @Length(4, 100)
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column({ unique: true })
  @Length(4, 100)
  urlName: string;

  @OneToMany((type) => Product, (product) => product.id)
  products: Product[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
