import { Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Navbar } from "./components";

export const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
};
