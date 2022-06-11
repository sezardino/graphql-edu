export interface Post {
  id: string;
  title: string;
  content: string;
}

export interface User {
  id: string;
  username: string;
  age: number;
  posts: Post[];
}

export interface UserInput {
  id: string;
  username: string;
  age: number;
  posts: [PostInput];
}

export interface PostInput {
  id: string;
  title: string;
  content: string;
}
