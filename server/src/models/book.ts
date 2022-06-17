import { Schema, model } from "mongoose";

interface Book {
  name: string;
  genre: string;
  authorId: string;
}

const BookSchema = new Schema<Book>({
  name: String,
  genre: String,
  authorId: Schema.Types.ObjectId,
});

export const Book = model("Book", BookSchema);
