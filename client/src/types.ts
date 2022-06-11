export interface User {
  id: string;
  username: string;
  age: number;
}

export type UserInput = Pick<User, "username" | "age">;
