import { BrowserRouter, Route, Router, Routes } from "react-router-dom";


// Pages
import Signup from "./containers/auth/Signup";
import Login from "./containers/auth/Login";
import Activate from "./containers/auth/Activate";
import Error404 from "./containers/errors/Error404";
import Home from "./containers/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route exact path="/" element={<Home />} />

        {/* Authentication */}
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/activate/:uid/:token" element={<Activate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
