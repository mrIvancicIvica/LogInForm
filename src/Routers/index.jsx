import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Singup from "../components/Signup";
import Home from "../components/Home";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="signup" element={<Singup />} />
    </Routes>
  );
};

export default Routers;
