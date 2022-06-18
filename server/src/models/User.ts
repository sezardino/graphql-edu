import { model, Schema } from "mongoose";

interface User {
  username: string;
  password: string;
  email: string;
  token: string;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
});

export const User = model("User", userSchema);
