import { Request } from "express";
import config from "@config/config";
import * as jwt from "jsonwebtoken";

const getUserIdFromJwt = (req: Request) => {
  const { userId } = jwt.verify(
    <string>req.headers.authorization.split("Bearer ")[1],
    config.jwtSecret
  );

  return userId;
};

export default getUserIdFromJwt;
