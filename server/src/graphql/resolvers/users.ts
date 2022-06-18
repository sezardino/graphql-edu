import { ApolloError } from "apollo-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { LoginInput, RegisterInput } from "../types";
import { User } from "../../models";

export const usersResolvers = {
  Mutation: {
    async register(_: any, args: RegisterInput) {
      const { registerInput } = args;
      console.log(args);

      const hasUser = await User.findOne({ username: registerInput.username });

      console.log(hasUser);

      if (hasUser) {
        throw new ApolloError("User already exists", "USER_EXISTS");
      }

      const hashedPassword = await bcrypt.hash(registerInput.password, 10);

      const newUser = new User({ ...registerInput, password: hashedPassword });

      const token = jwt.sign(
        { email: newUser.email, userId: newUser.id },
        "secret_string",
        { expiresIn: "2h" }
      );

      newUser.token = token;

      return await newUser.save();
    },
    async login(_: any, args: LoginInput) {
      const { loginInput } = args;

      const user = await User.findOne({ email: loginInput.email });

      if (!user) {
        throw new ApolloError("User not found", "USER_NOT_FOUND");
      }

      const passwordValidation = await bcrypt.compare(
        loginInput.password,
        user.password
      );

      if (!passwordValidation) {
        throw new ApolloError("Invalid password", "INVALID_PASSWORD");
      }

      const token = jwt.sign(
        { email: user.email, userId: user.id },
        "secret_string",
        { expiresIn: "2h" }
      );

      user.token = token;

      return await user.save();
    },
  },
  Query: {},
};
