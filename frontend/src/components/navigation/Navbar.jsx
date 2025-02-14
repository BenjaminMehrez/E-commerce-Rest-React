import { Link, Navigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import Alert from "../../components/Alert";

function Navbar({ isAuthenticated, logout }) {
  const [redirect, setRedirect] = useState(false);

  const handleLogout = async () => {
    await logout();
    setRedirect(true);
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <header className="sticky top-0 z-50 text-white shadow-md" style={{backgroundColor: "#0B0000"}}>
      <nav className="container mx-auto flex h-full items-center justify-between px-6">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.webp" alt="Logo" className="w-20" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          <li>
            <Link to="/shop" className="hover:text-gray-300 font-semibold">Productos</Link>
          </li>
          {isAuthenticated ? <UserMenu handleLogout={handleLogout} /> : <GuestLinks />}
        </ul>
      </nav>
      <Alert />
    </header>
  );
}

const UserMenu = ({ handleLogout }) => (
  <Menu as="div" className="relative">
    <MenuButton className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">
      <span className="inline-block h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    </MenuButton>
    
    <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
      <div className="py-1">
        <MenuItem>
          {({ active }) => (
            <Link to="/account" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
              Account Settings
            </Link>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
            >
              Log out
            </button>
          )}
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
);

const GuestLinks = () => (
  <Fragment>
    <li>
      <Link to="/login" className="hover:text-gray-300 font-semibold">Inica Sesion</Link>
    </li>
    <li>
      <Link to="/signup" className="hover:text-gray-300 font-semibold">Registrate</Link>
    </li>
  </Fragment>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.counter.Auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
