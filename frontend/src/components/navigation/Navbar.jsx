import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { get_categories } from "../../redux/actions/categories";
import { get_search_products } from "../../redux/actions/products";
import Alert from "../../components/Alert";
import SearchBox from "./SearchBox";

function Navbar({
  isAuthenticated,
  logout,
  get_categories,
  get_search_products,
  total_items,
  categories,
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
    <header className="flex sticky top-0 z-50 text-white shadow-md bg-black h-20">
      <nav className="flex navbar shadow-sm items-center justify-around">

        <div className="flex items-center gap-10">
          {/* Logo */}

          <Link to="/">
            <img src="/logo.webp" alt="Logo" className="w-20" />
          </Link>
          
          <div className="flex items-center">
            <ul className="menu menu-horizontal px-1 flex items-center">
              <li>
                <NavLink to="/shop" className="font-medium text-base">
                  Productos
                </NavLink>
              </li>
              <li>
                <details>
                  <summary className="font-medium text-base">
                    Categorias
                  </summary>
                  <ul className="bg-base-100 text-black rounded-t-none p-2">
                    {categories &&
                      categories.length > 0 &&
                      categories !== null &&
                      categories !== undefined &&
                      categories.map((category) => (
                        <li key={category.id}>
                          <Link to={`/category/${category.id}`}>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <SearchBox
            search={formData.search}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle "
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />{" "}
                  </svg>
                  <span className="bg-white text-black px-2 rounded-xl indicator-item">
                    {total_items}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow text-black"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {total_items} Productos
                  </span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <Link to="/cart" className="btn btn-primary btn-block">
                      Ir a carrito
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-13">
      <div className="rounded-full">
        <img
          alt="User avatar"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow text-black"
    >
      <li>
        <Link to="/account" className="block px-4 py-2 text-sm">
          Configuracion
        </Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm"
        >
          Cerrar Sesion
        </button>
      </li>
    </ul>
  </div>
);

const GuestLinks = () => (
  <>
    <Link to="/login" className="hover:text-gray-300 font-medium">
      Iniciar Sesion
    </Link>
    <Link to="/signup" className="hover:text-gray-300 font-medium">
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
