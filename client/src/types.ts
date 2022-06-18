export interface User {
  id: string;
  username: string;
  age: number;
}

export interface AuthInput {
  token: string;
  email: string;
  id: string;
}

export type UserInput = Pick<User, "username" | "age">;
