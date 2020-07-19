import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { Product } from "@entities/Product";
import { User } from "@entities/User";
import * as jwt from "jsonwebtoken";
import jwtSecret from "@config/config";

export class ProductController {
  static list = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();

    res.send(productRepository.find());
  };

  static create = async (req: Request, res: Response) => {
    const { name, description, price } = req.body;

    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const product = new Product();

    product.name = name;
    product.description = description;
    product.price = price;

    const userId = jwt.verify(req.headers.authorization, jwtSecret);

    console.log(userId);

    const user = await userRepository.findOne({ id: userId });

    if (!user) {
      res.status(404).send({ response: "User not found." });
    }

    user.products = [...user.products, product];

    productRepository.save(product);
    userRepository.save(user);

    res.status(201).send(product);
  };
}
