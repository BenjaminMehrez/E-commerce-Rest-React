import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { check_authenticated, load_user, refresh } from "../redux/actions/auth";
import { get_items, get_total, get_item_total } from "../redux/actions/cart";
import { connect } from "react-redux";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { useEffect } from "react";

const Layout = ({
  children,
  refresh,
  check_authenticated,
  load_user,
  get_items,
  get_total,
  get_item_total,
}) => {
  useEffect(() => {
    refresh();
    check_authenticated();
    load_user();
    get_items()
    get_total()
    get_item_total()
  }, []);

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
  check_authenticated,
  load_user,
  refresh,
  get_items,
  get_total,
  get_item_total,
})(Layout);
