import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const authMiddleware = (context) => {
  const { headers } = context;

  if (!headers.authorization) {
    throw new AuthenticationError("No authorization header");
  }

  const token = headers.authorization.split(" ")[1];

  if (!token) {
    throw new AuthenticationError("No token");
  }

  try {
    const { userId } = jwt.verify(token, "secret_string");
    context.userId = userId;
  } catch (e) {
    throw new AuthenticationError("Invalid token");
  }
};
