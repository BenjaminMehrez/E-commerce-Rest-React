import { Navigate, useParams } from "react-router-dom";
import Layout from "../../hocs/Layout";
import { useState } from "react";
import { connect } from "react-redux";
import { activate } from "../../redux/actions/auth";
import ClipLoader from "react-spinners/ClipLoader";

const Activate = ({ activate, loading }) => {
  const [activated, setActivated] = useState(false);
  const params = useParams();

  const activateAccount = () => {
    const uid = params.uid;
    const token = params.token;
    activate(uid, token);
    setActivated(true);
  };

  if (activated && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="max-w-7xl h-120 mx-auto px-4 sm:px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <button className="items-center bg-violet-800 text-white p-4 rounded w-40 h-14">
              <ClipLoader
                color="white" loading={true} size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          ) : (
            <button
              onClick={activateAccount}
              className="items-center bg-violet-800 text-white p-4 rounded w-40 h-14"
            >
              Activate Account
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.counter.Auth.loading,
});

export default connect(mapStateToProps, {
  activate,
})(Activate);
