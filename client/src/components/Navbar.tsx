import { Link } from "react-router-dom";
import { useAuth } from "../context";

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const Navbar: React.FC<Props> = (props) => {
  const { className } = props;
  const { user, logout } = useAuth();

  const linkClasses = "text-white text-lg p-1";

  return (
    <header className={`py-5 bg-slate-400 ${className}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-slate-200">
          ReactLogin
        </Link>
        <div className="flex gap-5">
          {!user ? (
            <>
              <Link to="/login" className={linkClasses}>
                Login
              </Link>
              <Link to="/register" className={linkClasses}>
                Register
              </Link>
            </>
          ) : (
            <button className={linkClasses} onClick={logout}>
              logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
