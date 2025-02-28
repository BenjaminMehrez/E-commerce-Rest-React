import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { get_categories } from "../../redux/actions/categories";
import { get_search_products } from "../../redux/actions/products";
import Alert from "../../components/Alert";
import SearchBox from "./SearchBox";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Navbar({
  isAuthenticated,
  logout,
  get_categories,
  get_search_products,
  total_items
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ category_id: "0", search: "" });

  useEffect(() => {
    get_categories();
  }, []); // Se ejecuta solo una vez

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    get_search_products(formData.search, formData.category_id);
    navigate("/search");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header
      className="sticky top-0 z-50 text-white shadow-md"
      style={{ backgroundColor: "#0B0000" }}
    >
      <nav className="container mx-auto flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to="/">
            <img src="/logo.webp" alt="Logo" className="w-20" />
          </Link>

          <NavLink to="/shop" className="hover:text-gray-300 font-semibold">
            Productos
          </NavLink>

          <SearchBox
            search={formData.search}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="hover:text-gray-300 cursor-pointer">
            <ShoppingCartIcon className="w-6" />
            <span className="text-xs absolute top-1 mt-3 ml-4 bg-white text-black font-semibold rounded-full px-2 text-center">{total_items}</span>
          </Link>
          {isAuthenticated ? (
            <UserMenu handleLogout={handleLogout} />
          ) : (
            <GuestLinks />
          )}
        </div>
      </nav>
      <Alert />
    </header>
  );
}

const UserMenu = ({ handleLogout }) => (
  <Menu as="div" className="relative">
    <Menu.Button className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">
      <span className="inline-block h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    </Menu.Button>

    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white text-black shadow-lg ring-1 ring-black/5">
      <div className="py-1">
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/account"
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Account Settings
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`block w-full text-left px-4 py-2 text-sm ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Log out
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  </Menu>
);

const GuestLinks = () => (
  <>
    <Link to="/login" className="hover:text-gray-300 font-semibold">
      Iniciar Sesion
    </Link>
    <Link to="/signup" className="hover:text-gray-300 font-semibold">
      Registrate
    </Link>
  </>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.counter.Auth.isAuthenticated,
  user: state.counter.Auth.user,
  categories: state.counter.Categories.categories,
  total_items: state.counter.Cart.total_items,
});

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products,
})(Navbar);
