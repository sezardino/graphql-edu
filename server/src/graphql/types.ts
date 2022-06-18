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
    confirmPassword: string;
    email: string;
  };
}

export interface LoginInput {
  loginInput: {
    password: string;
    email: string;
  };
}
