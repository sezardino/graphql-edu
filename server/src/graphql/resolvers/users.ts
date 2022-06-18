import { ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { LoginInput, RegisterInput } from "../types";
import { User } from "../../models";

export const usersResolvers = {
  Mutation: {
    async register(_: any, args: RegisterInput) {
      const { registerInput } = args;

      if (!registerInput.username) {
        throw new ApolloError("Name is required");
      }

      if (!registerInput.email) {
        throw new ApolloError("Email is required");
      }

      if (!registerInput.password) {
        throw new ApolloError("Password is required");
      }

      if (registerInput.password !== registerInput.confirmPassword) {
        throw new ApolloError("Passwords do not match");
      }

      const hasUser = await User.findOne({ username: registerInput.username });

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

      if (!loginInput.email) {
        throw new ApolloError("Email is required");
      }

      if (!loginInput.password) {
        throw new ApolloError("Password is required");
      }

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
  Query: {
    users: async () => User.find(),
  },
};
