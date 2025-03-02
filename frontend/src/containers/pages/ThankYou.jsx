import { useSelector } from "react-redux";
import Layout from "../../hocs/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ThankYou() {
    const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.counter.Auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Thank You
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Hope you enjoyed shopping in nineRogues
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ThankYou;
