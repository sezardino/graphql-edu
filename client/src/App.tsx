import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { userMutation, userQuery } from "./graphql";

import { CreateUserForm, UsersList } from "./components";
import { UserInput } from "./types";

interface User {
  id: string;
  username: string;
  age: number;
}

interface GetAllUsers {
  getAllUsers: User[];
}

export const App: React.FC = () => {
  const [getAllUsers, { loading, error, refetch }] = useLazyQuery<GetAllUsers>(
    userQuery.getAllUsers
  );
  const [createUser] = useMutation(userMutation.createUser);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const { data } = await getAllUsers();

    setUsers(data?.getAllUsers || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onCreateUser = async (input: UserInput) => {
    await createUser({ variables: { input } });
    await refetch();
    await fetchUsers();
  };

  return (
    <div className="container p-5 mx-auto">
      <CreateUserForm className="mb-5" submitHandler={onCreateUser} />
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}
        {!loading && !error && users && <UsersList users={users} />}
      </div>
    </div>
  );
};
