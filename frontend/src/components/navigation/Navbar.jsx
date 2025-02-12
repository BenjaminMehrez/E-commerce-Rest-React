import { Link, Navigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { logout } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { Fragment, useState } from "react";

function Navbar({ isAuthenticated, user, logout }) {

  const [redirect, setRedirect] = useState(false)

  const handlerLogout = async () => {
    await logout()
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  const authLinks = (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              License
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                onClick={handlerLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Log out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login">Sign In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </Fragment>
  );

  return (
    <>
      <div className="sticky top-0 bg-slate-950 h-16 text-white">
        <nav className="max-w-300 mx-auto flex h-full items-center justify-between">
          <div>
            <img src="/logo.webp" alt="logo" className="w-17" />
          </div>
          <ul className="flex gap-10">
            <li>
              <Link to="/">Products</Link>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </nav>
      </div>
      <Alert />
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.counter.Auth.isAuthenticated,
  user: state.counter.Auth.user,
});

export default connect(mapStateToProps, {
  logout,
})(Navbar);
