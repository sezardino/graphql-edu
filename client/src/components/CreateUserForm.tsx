import { useState } from "react";
import { UserInput } from "../types";

interface Props extends React.HTMLProps<HTMLFormElement> {
  submitHandler: (input: UserInput) => Promise<void>;
}

export const CreateUserForm: React.FC<Props> = (props) => {
  const { submitHandler, className, ...rest } = props;
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);

  const onSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    await submitHandler({ username: name, age });
  };

  return (
    <form {...rest} className={`${className} grid gap-2`} onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        className="border px-3 py-2 border-black placeholder:text-black"
        onChange={(evt) => setName(evt.target.value)}
      />
      <input
        name="age"
        type="number"
        placeholder="age"
        required
        className="border px-3 py-2 border-black placeholder:text-black"
        onChange={(evt) => setAge(Number(evt.target.value).valueOf())}
      />
      <button type="submit" className="bg-slate-500 text-white p-1">
        Create User
      </button>
    </form>
  );
};
