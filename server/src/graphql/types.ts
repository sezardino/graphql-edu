export interface MessageInput {
  messageInput: {
    text: string;
    username: string;
  };
}

export interface RegisterInput {
  registerInput: {
    username: string;
    password: string;
    email: string;
  };
}

export interface LoginInput {
  loginInput: {
    password: string;
    email: string;
  };
}
