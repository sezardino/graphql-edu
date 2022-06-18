import { Message } from "../../models";
import { MessageInput } from "../types";

export const messagesResolvers = {
  Mutation: {
    async createMessage(
      _: any,
      { messageInput: { text, username } }: MessageInput
    ) {
      const newMessage = new Message({
        text: text,
        createdBy: username,
        createdAt: new Date().toISOString(),
      });

      return await newMessage.save();
    },
  },
  Query: {
    message: (_: any, { id }: { id: string }) => Message.findById(id),
  },
};
