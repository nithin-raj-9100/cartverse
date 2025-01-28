import "./index.css";

import { Route, Routes } from "react-router";
import Login from "./pages/login";
import Home from "./pages/Home";
import Signup from "./pages/signup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
