import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import Layout from "../../hocs/Layout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.counter.Auth.loading);
  const isAuthenticated = useSelector(
    (state) => state.counter.Auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));
  };

  return (
    <Layout>
      <div className="flex min-h-140 mt-20 mb-40 justify-center">
        <div className="w-120 rounded-lg p-8">
          <div className="text-center px-10">
            <h2 className="my-10 text-center text-4xl font-semibold underline">
              Iniciar Sesion
            </h2>
            <p>Si aún no ha creado una cuenta, por favor <Link to={"/signup"} className="font-medium underline">regístrese</Link> primero.</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 mt-13 px-6"
          >
            <label className="text-sm font-medium">
              Correo Electronico
              <input
                className="w-full border-b p-1 mt-2 outline-none"
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                required
              />
            </label>
            <label className="text-sm font-medium">
              Contraseña
              <input
                className="w-full border-b p-1 mt-2 outline-none"
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
              />
            </label>

            <div className="text-sm">
              <Link to="/reset_password" className="font-medium underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="">
              {loading ? (
                <button
                  type="submit"
                  className="w-full text-white font-medium bg-gray-900 p-2 mt-8 outline-none rounded-md cursor-pointer transition-all"
                >
                  <span className="loading loading-spinner loading-sm"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white font-medium bg-black p-2 mt-8 outline-none rounded-md cursor-pointer hover:bg-gray-900 transition-all"
                >
                  Iniciar Sesion
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
