import { User } from "../types";

interface Props extends React.HTMLProps<HTMLUListElement> {
  users: User[];
}

export const UsersList: React.FC<Props> = (props) => {
  const { users, className, ...rest } = props;

  return (
    <ul {...rest} className={`${className} border rounded-xl`}>
      {users.map((user, index) => (
        <li key={user.id} className="border-b p-6 last:border-0 relative">
          <small className="font-bold absolute left-2 top-7">{index + 1}.</small>
          <div>
            <p>name: {user.username}</p>
            <p>age: {user.age}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
