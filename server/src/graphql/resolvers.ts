import { User, UserInput } from "./types";

const users: User[] = [
  {
    id: "1",
    username: "John",
    age: 30,
    posts: [{ id: "1", title: "Post 1", content: "Content 1" }],
  },
];

const getAllUsers = () => users;

const getUser = ({ id }: { id: string }) =>
  users.find((user) => user.id === id);

const createUser = ({ input }: { input: UserInput }) => {
  const newUser = {
    ...input,
    id: Date.now().toString(),
  };

  users.push(newUser);

  return newUser;
};

export const resolvers = {
  getAllUsers,
  getUser,
  createUser,
};
