import { Message } from "../../models/message";
import { MessageInput, MessageQuery } from "../types";

export const messageResolvers = {
  Mutation: {
    createMessage: async (_, args: MessageInput) => {
      const newMessage = new Message({
        ...args.message,
        createdBy: args.message.userName,
      });
      return await newMessage.save();
    },
  },
  Query: {
    message: async (_, args: MessageQuery) => await Message.findById(args.id),
  },
};
