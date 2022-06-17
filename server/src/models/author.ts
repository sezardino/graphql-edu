import { Schema, model } from "mongoose";

interface Author {
  name: string;
  age: number;
}

const AuthorSchema = new Schema<Author>({
  name: String,
  age: Number,
});

export const Author = model("Author", AuthorSchema);
