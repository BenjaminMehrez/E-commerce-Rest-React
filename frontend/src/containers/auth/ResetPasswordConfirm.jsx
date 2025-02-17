import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../redux/actions/auth";
import ClipLoader from "react-spinners/ClipLoader";
import Layout from "../../hocs/Layout";

function ResetPasswordConfirm({ reset_password_confirm, loading }) {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    new_re_password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.new_re_password) {
      alert("Las contraseñas no coinciden");
      return;
    }

    reset_password_confirm(uid, token, formData.new_password, formData.new_re_password);
    setRequestSent(true);
  };

  useEffect(() => {
    if (requestSent && !loading) {
      navigate("/");
    }
  }, [requestSent, loading, navigate]);

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
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Get your new password
            </h2>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                New Password
              </label>
              <input
                placeholder="Password"
                value={formData.new_password}
                onChange={onChange}
                name="new_password"
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
                value={formData.new_re_password}
                onChange={onChange}
                name="new_re_password"
                type="password"
                required
                className="block w-full mt-1 rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="white" loading={true} size={20} />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
});

export default connect(mapStateToProps, { reset_password_confirm })(ResetPasswordConfirm);
