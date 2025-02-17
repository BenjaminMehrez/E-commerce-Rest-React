import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activate } from "../../redux/actions/auth";
import Layout from "../../hocs/Layout";
import ClipLoader from "react-spinners/ClipLoader";

const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const loading = useSelector((state) => state.counter.Auth.loading);
  const isActivated = useSelector((state) => state.counter.Auth.isActivated); // Asegúrate de tener un estado isActivated en Redux

  useEffect(() => {
    if (isActivated) {
      navigate("/"); // Redirige a home cuando la cuenta se haya activado
    }
  }, [isActivated, navigate]);

  const activateAccount = () => {
    dispatch(activate(uid, token));
  };

  return (
    <Layout>
      <div className="max-w-7xl h-120 mx-auto px-4 sm:px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <button className="items-center bg-violet-800 text-white p-4 rounded w-40 h-14">
              <ClipLoader color="white" loading={true} size={20} />
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

export default Activate;
