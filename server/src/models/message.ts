import { model, Schema, Document } from "mongoose";

interface Message {
  text: string;
  createdBy: string;
}

interface MessageDocument extends Message, Document {}

const messageSchema = new Schema(
  {
    text: String,
    createdBy: String,
  },
  { timestamps: true }
);

export const Message = model<MessageDocument>("Message", messageSchema);
