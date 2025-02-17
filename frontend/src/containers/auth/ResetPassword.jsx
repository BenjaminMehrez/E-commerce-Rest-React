import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset_password } from "../../redux/actions/auth";
import Layout from "../../hocs/Layout";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.counter.Auth.loading);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loading) {
      navigate("/");
    }
  }, [loading, navigate]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reset_password(email));
  };



  return (
    <Layout>
      <div className="bg-gray-300">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Recover your Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <button className="w-full flex justify-center bg-violet-800 text-white p-4 rounded">
                    <ClipLoader color="white" loading={true} size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600"
                  >
                    Send Email
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
