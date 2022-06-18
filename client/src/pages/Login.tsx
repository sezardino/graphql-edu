import { gql, useMutation } from "@apollo/client";
import { GraphQLErrors } from "@apollo/client/errors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Spinner } from "../components";
import { useAuth } from "../context";
import { useForm } from "../hooks/useForm";
import { AuthInput } from "../types";

interface RegisterFields {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(loginInput: $input) {
      token
      username
      email
      id
    }
  }
`;

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<GraphQLErrors>([]);
  const [register, { loading, data }] = useMutation<{
    login: AuthInput;
  }>(LOGIN_MUTATION, {
    onError: ({ graphQLErrors }) => setErrors(graphQLErrors),
    onCompleted: (data) => {
      login({
        email: data.login.email,
        token: data.login.token,
        id: data.login.id,
      });
      navigate("/");
    },
  });
  const { onChange, onSubmit, values, resetFields } = useForm<RegisterFields>(
    {
      email: "",
      password: "",
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
            Login
            {loading && <Spinner />}
          </button>
        </div>
      </form>
    </div>
  );
};
