interface Props extends React.HTMLProps<HTMLInputElement> {}

export const Input: React.FC<Props> = (props) => {
  const { className, type = "text", ...rest } = props;

  return (
    <input
      {...rest}
      type={type}
      className={`border-2 border-slate-200 rounded-lg p-2 ${className}`}
    />
  );
};
