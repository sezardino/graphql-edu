import { gql, useMutation } from "@apollo/client";
import { GraphQLErrors } from "@apollo/client/errors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Spinner } from "../components";
import { useAuth } from "../context";
import { useForm } from "../hooks/useForm";
import { AuthInput } from "../types";

interface RegisterFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(registerInput: $input) {
      token
      username
      email
      id
    }
  }
`;

export const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<GraphQLErrors>([]);
  const [register, { loading, data }] = useMutation<{
    register: AuthInput;
  }>(REGISTER_MUTATION, {
    onError: ({ graphQLErrors }) => setErrors(graphQLErrors),
    onCompleted: (data) => {
      login({
        email: data.register.email,
        token: data.register.token,
        id: data.register.id,
      });
      navigate("/");
    },
  });
  const { onChange, onSubmit, values, resetFields } = useForm<RegisterFields>(
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    submitHandler
  );

  async function submitHandler() {
    await register({ variables: { input: values } });
  }

  return (
    <div className="container mx-auto py-11">
      <h1 className="text-4xl">Register</h1>
      <form className="mt-8 grid gap-2" onSubmit={onSubmit}>
        <Input
          name="username"
          placeholder="Name"
          disabled={loading}
          value={values.username}
          onChange={onChange}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          disabled={loading}
          value={values.email}
          onChange={onChange}
        />
        <Input
          name="password"
          placeholder="Password"
          disabled={loading}
          value={values.password}
          onChange={onChange}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          disabled={loading}
          value={values.confirmPassword}
          onChange={onChange}
        />
        {errors &&
          errors.map((error, index) => (
            <div
              key={index}
              className="p-5 bg-red-400 rounded-lg text-white font-medium"
            >
              {error.message}
            </div>
          ))}
        <div className="justify-self-start flex gap-3 flex-wrap">
          <button
            type="submit"
            className="font-medium border rounded-lg px-8 py-2 flex gap-2 items-center"
            disabled={loading}
          >
            Register
            {loading && <Spinner />}
          </button>

          <button
            type="reset"
            className="font-medium bg-red-300 border rounded-lg px-8 py-2"
            disabled={loading}
            onClick={resetFields}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
