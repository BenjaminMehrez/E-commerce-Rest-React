import { useEffect, useState } from "react";
import Layout from "../../hocs/Layout";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../redux/actions/auth";
import ClipLoader from "react-spinners/ClipLoader";

function ResetPassword({ reset_password, loading }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
    console.log(formData);
    window.scrollTo(0, 0);
  };

  if (requestSent && !loading) {
    return <Navigate to="/" />;
  }

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
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Recover your Password
            </h2>
            
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <button className="items-center bg-violet-800 text-white p-4 rounded ">
                    <ClipLoader
                      color="white"
                      loading={true}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
}

const mapStateToProps = (state) => ({
  loading: state.counter.Auth.loading,
});

export default connect(mapStateToProps, {
  reset_password,
})(ResetPassword);
