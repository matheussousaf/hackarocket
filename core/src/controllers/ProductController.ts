import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { Product } from "@entities/Product";
import { User } from "@entities/User";
import getUserIdFromJwt from "@utils/getId";
import { serializeProductImage } from "@utils/serialize";
import { deleteProductImage } from "@utils/deletion";

export class ProductController {
  static list = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const userId = getUserIdFromJwt(req);

    const products = await productRepository.find({
      where: { user: { id: userId } },
    });

    products.map((product) => {
      product.image = serializeProductImage(product.image);
    });

    res.send(products);
  };

  static index = async (req: Request, res: Response) => {
    const { productId } = req.params;

    const productRepository = getRepository(Product);
    const userId = getUserIdFromJwt(req);

    const product = await productRepository.findOne({
      where: {
        id: productId,
        user: {
          id: userId,
        },
      },
    });

    if (!product) {
      res
        .status(404)
        .send({ response: "Product not found on your inventory." });
    }

    const serializedImage = serializeProductImage(product.image);

    res.send({ ...product, image: serializedImage });
  };

  static delete = async (req: Request, res: Response) => {
    const { productId } = req.params;

    const productRepository = getRepository(Product);
    const userId = getUserIdFromJwt(req);

    const product = await productRepository.findOne({
      where: {
        id: productId,
        user: {
          id: userId,
        },
      },
    });

    if (!productId) {
      res.status(404).send("Product not found on your inventory");
    }

    deleteProductImage(product.image);

    try {
      await productRepository.remove(product);
    } catch (error) {
      res.status(400).send({ response: `Wrong formatting: ${error}` });
    }

    res.status(204).send();
  };

  static edit = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { name, description, price, category } = req.body;

    const productRepository = getRepository(Product);
    const userId = getUserIdFromJwt(req);

    const product = await productRepository.findOne({
      where: {
        id: productId,
        user: {
          id: userId,
        },
      },
    });

    product.name = name;
    product.category = category;
    product.description = description;
    product.price = price;
    product.image = req.file.filename;

    if (!productId) {
      res.status(404).send("Product not found on your inventory");
    }

    try {
     await productRepository.save(product);
    } catch (error) {
      res.status(400).send({ response: `Wrong formatting: ${error}` });
    }

    res.status(204).send();
  };

  static create = async (req: Request, res: Response) => {
    const { name, description, price, category } = req.body;

    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const product = new Product();

    product.name = name;
    product.description = description;
    product.price = price;
    product.image = req.file.filename;
    product.category = category;

    const userId = getUserIdFromJwt(req);

    const user = await userRepository.findOne({ id: userId });

    if (!user) {
      res.status(404).send({ response: "User not found." });
    }

    product.user = user;

    try {
      await productRepository.save(product);
      await userRepository.save(user);
    } catch (error) {
      res.status(400).send({ response: `Wrong formatting: ${error}` });
    }

    res.status(204).send();
  };
}
