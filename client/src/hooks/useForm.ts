import { useState } from "react";

interface UseForm<T> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetFields: () => void;
  values: T;
}

export const useForm = <T>(
  initialState: T,
  callback: () => void
): UseForm<T> => {
  const [values, setValues] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback();
  };

  const resetFields = () => {
    setValues(initialState);
  };

  return {
    resetFields,
    onChange,
    onSubmit,
    values,
  };
};
