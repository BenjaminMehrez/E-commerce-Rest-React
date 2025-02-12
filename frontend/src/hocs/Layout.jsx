import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuthenticated, load_user, refresh } from "../redux/actions/auth";
import { connect } from "react-redux";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { useEffect } from "react";

const Layout = ({ children, refresh, checkAuthenticated, load_user }) => {

  useEffect(() => {
    refresh()
    checkAuthenticated()
    load_user()
  },[])

  return (
    <div>
      <Navbar />
      <ToastContainer autoClose={5000} />
      {children}
      <Footer />
    </div>
  );
};

export default connect(null, {
  checkAuthenticated,
  load_user,
  refresh,
})(Layout);
