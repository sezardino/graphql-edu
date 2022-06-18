import { AuthenticationError } from "apollo-server-express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedUser {
  email: string;
  userId: string;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { headers } = req;

  if (!headers.authorization) {
    return next();
  }

  const token = headers.authorization.split(" ")[1];

  if (!token) {
    throw new AuthenticationError("No token");
  }

  try {
    const { userId, email } = jwt.verify(token, "secret_string") as DecodedUser;
    req.user = { userId, email };
  } catch (e) {
    throw new AuthenticationError("Invalid token");
  }

  next();
};
