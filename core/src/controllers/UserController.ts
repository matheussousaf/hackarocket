import { Request, Response } from "express";
import { User } from "@entities/User";
import config from "@config/config";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

export class UserController {
  static list = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const users = await userRepository.find({
      select: ["id", "name", "email"],
    });

    res.send(users);
  };

  static edit = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const { email, name, urlName } = req.body;

    const user = await userRepository.findOne({
      where: { email: email },
      select: ["name", "email", "urlName"],
    });

    if (!user) {
      res.status(404).send({ response: "User not found" });
    }

    const newUser = new User();

    newUser.email = email;
    newUser.urlName = urlName;
    newUser.name = name;

    res.status(204);
  };

  static create = async (req: Request, res: Response) => {
    const { name, password, email } = req.body;

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = password;

    const errors = await validate(user);

    if (errors.length > 0) {
      res.status(400).send({ response: `Wrong formatting: ${errors}` });
      return;
    }

    user.hashPassword();

    const userRepository = getRepository(User);

    const existentUser = await userRepository.findOne({ email: user.email });

    if (existentUser) {
      res.status(401).send({ response: "User already exists" });
    }

    try {
      await userRepository.save(user);
    } catch (error) {
      res.status(400).send({ response: `Wrong formatting: ${error}` });
    }

    res.status(201).send({ response: "User created." });
  };
}
