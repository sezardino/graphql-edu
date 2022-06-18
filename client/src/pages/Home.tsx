import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAuth } from "../context";
import { User } from "../types";

const GET_USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

export const Home = () => {
  const { user } = useAuth();
  const [getHandler, { data }] = useLazyQuery<{ users: User[] }>(GET_USERS);

  useEffect(() => {
    getHandler();
    // if (user) {
    // }
  }, []);

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl">Home</h1>

      <p className="mt-5 text-xl">
        {user ? `Welcome, ${user.email}` : "Please login"}
      </p>

      {user &&
        data &&
        data.users.map((user) => (
          <div key={user.id}>
            <p>{user.username}</p>
          </div>
        ))}
    </div>
  );
};
