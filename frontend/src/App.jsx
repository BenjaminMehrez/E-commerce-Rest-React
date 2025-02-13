import { BrowserRouter, Route, Router, Routes } from "react-router-dom";


// Pages
import Signup from "./containers/auth/Signup";
import Login from "./containers/auth/Login";
import ResetPassword from "./containers/auth/ResetPassword";
import Activate from "./containers/auth/Activate";
import Error404 from "./containers/errors/Error404";
import Home from "./containers/Home";
import Shop from "./containers/Shop";
import ResetPasswordConfirm from "./containers/auth/ResetPasswordConfirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route exact path="/" element={<Home />} />

        {/* Authentication */}
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/reset_password" element={<ResetPassword />} />
        <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route exact path="/activate/:uid/:token" element={<Activate />} />

        <Route exact path="/shop" element={<Shop />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
