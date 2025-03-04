import { Fragment } from "react";
import { connect } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function Alert({ alert }) {
  const displayAlert = () => {
    if (alert !== null) {
      return (
        <div
          role="alert"
          className={`absolute top-25 right-10 alert ${alert.alertType === 'green' ? 'alert-success' : 'alert-error'}`}
        >
          {alert.alertType === "green" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <span>{alert.msg}</span>
        </div>
      );
    } else {
      return <Fragment></Fragment>;
    }
  };
  return <Fragment>{displayAlert()}</Fragment>;
}

const mapStateToProps = (state) => ({
  alert: state.counter.Alert.alert,
});

export default connect(mapStateToProps)(Alert);
