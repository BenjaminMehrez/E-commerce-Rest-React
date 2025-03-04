import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/actions/auth";
import Layout from "../../hocs/Layout";
import { Link } from "react-router-dom";

function Signup() {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(first_name, last_name, email, password, re_password));
  };

  return (
    <Layout>
      <div className="flex min-h-140 mt-20 mb-40  justify-center">
        <div className="w-120 rounded-lg p-8">
          <div className="text-center">
            <h2 className="my-10 text-center text-4xl font-semibold underline">
              Registrate
            </h2>
            <p>¿Ya tiene una cuenta? Por favor <Link to="/login" className="font-medium underline">inicie sesión.</Link></p>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-8 mt-10 px-6">
            <label className="text-sm font-medium">
              Nombre
              <input
                className="w-full border-b p-1 mt-2 outline-none"
                value={first_name}
                onChange={onChange}
                name="first_name"
                type="text"
                required
              />
            </label>
            <label className="text-sm font-medium">
              Apellido
              <input
                className="w-full border-b p-1 mt-2 outline-none"
                value={last_name}
                onChange={onChange}
                name="last_name"
                type="text"
                required
              />
            </label>
            <label className="text-sm font-medium">
              Correo Electronico
              <input
                className="w-full border-b p-1 mt-2 outline-none"
                value={email}
                onChange={onChange}
                name="email"
                type="email"
                required
              />
            </label>
            <label className="text-sm font-medium">
              Contraseña
              <input
                className="w-full border-b p-1 mt-2 outline-none"
                value={password}
                onChange={onChange}
                name="password"
                type="password"
                required
              />
            </label>

            <label className="text-sm font-medium">
              Confirmar Contraseña
              <input
                className="w-full border-b p-1 mt-2 outline-none"
                value={re_password}
                onChange={onChange}
                name="re_password"
                type="password"
                required
              />
            </label>

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
                  Crear cuenta
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
