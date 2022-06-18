import { useReducer, createContext, useContext } from "react";
import jwtDecode from "jwt-decode";

import { AuthInput } from "../types";

interface UserContext {
  email: string;
  userId: string;
}

interface IAuthContext {
  user: UserContext | null;
  login: (user: AuthInput) => void;
  logout: () => void;
}

interface State {
  user: UserContext | null;
}

enum ActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

const initialState: State = {
  user: null,
};

interface DecodedUser {
  email: string;
  userId: string;
  exp: number;
}

const lsToken = localStorage.getItem("token");

if (lsToken) {
  const decodedToken = jwtDecode<DecodedUser>(lsToken);

  if (decodedToken.exp * 1000 > Date.now()) {
    const user = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };

    initialState.user = user;
  } else {
    localStorage.removeItem("token");
  }
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

const authReducer = (
  state: State,
  action: { type: ActionType; payload?: any }
) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: AuthInput) => {
    console.log(userData);
    localStorage.setItem("token", userData.token);
    dispatch({ type: ActionType.LOGIN, payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: ActionType.LOGOUT });
  };

  const value: IAuthContext = {
    user: state.user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider {...props} value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext<IAuthContext>(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
