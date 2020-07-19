import { Request, Response } from "express";
import { User } from "@entities/User";
import config from "@config/config";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { serializeProfileImage } from "@utils/serialize";

export class UserController {
  static list = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const users = await userRepository.find({
      select: ["id", "name", "email", "image", "urlName", "type"],
    });

    if (!users) {
      res.status(404).send({ response: "No users found." });
    }

    users.map((user) => {
      user.image = serializeProfileImage(user.image);
    });

    res.send(users);
  };

  static edit = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const { email, name, urlName } = req.body;

    const user = await userRepository.findOne({
      where: { email: email },
      select: ["name", "email", "urlName", "type"],
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
    const { name, password, email, urlName, type } = req.body;

    const user = new User();

    user.name = name;
    user.image = req.file.filename;
    user.email = email;
    user.password = password;
    user.urlName = urlName;
    user.type = type;

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
