import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../redux/actions/auth";
import Layout from "../../hocs/Layout";

function Signup({ signup }) {
  const navigate = useNavigate();

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
  const [accountCreated, setAccountCreated] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== re_password) {
      alert("Las contraseñas no coinciden");
      return;
    }

    signup(first_name, last_name, email, password, re_password);
    setAccountCreated(true);
  };

  useEffect(() => {
    if (accountCreated) {
      navigate("/");
    }
  }, [accountCreated, navigate]);

  return (
    <Layout>
      <div className="bg-gray-300 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm bg-white p-6 rounded shadow-md">
          <div className="text-center">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Register</h2>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                onChange={onChange}
                value={first_name}
                name="first_name"
                type="text"
                required
                className="block w-full mt-1 rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                value={last_name}
                onChange={onChange}
                name="last_name"
                type="text"
                required
                className="block w-full mt-1 rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                value={email}
                onChange={onChange}
                name="email"
                type="email"
                required
                className="block w-full mt-1 rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                value={password}
                onChange={onChange}
                name="password"
                type="password"
                required
                className="block w-full mt-1 rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Repeat Password
              </label>
              <input
                onChange={onChange}
                value={re_password}
                name="re_password"
                type="password"
                required
                className="block w-full mt-1 rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default connect(null, { signup })(Signup);
