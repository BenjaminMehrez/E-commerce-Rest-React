import { useEffect } from "react";
import Layout from "../../hocs/Layout";
import CartItem from "../../components/cart/CartItem";
import { setAlert } from "../../redux/actions/alert";
import { refresh } from "../../redux/actions/auth";
import { get_shipping_options } from "../../redux/actions/shipping";
import {
  get_payment_total,
  get_client_token,
  process_payment,
} from "../../redux/actions/payment";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remove_item, update_item } from "../../redux/actions/cart";
import { useState } from "react";
import ShippingForm from "../../components/ckeckout/ShippingForm";

import DropIn from "braintree-web-drop-in-react";
import { ClipLoader } from "react-spinners";

function Checkout({
  isAuthenticated,
  items,
  update_item,
  remove_item,
  setAlert,
  get_shipping_options,
  shipping,
  refresh,
  get_payment_total,
  get_client_token,
  process_payment,
  user,
  total_items,
  clientToken,
  made_payment,
  loading,
  original_price,
  total_amount,
  total_compare_amount,
  shipping_cost,
}) {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state_province_region: "",
    postal_code: "",
    country: "Argentina",
    telephone_number: "",
    shipping_id: 0,
  });

  const [data, setData] = useState({
    instance: {},
  });

  const {
    full_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    postal_code,
    country,
    telephone_number,
    shipping_id,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    window.scrollTo(0, 0);
    get_shipping_options();
  }, []);

  useEffect(() => {
    get_client_token();
  }, [user]);

  useEffect(() => {
    get_payment_total(shipping_id, "");
  }, [shipping_id]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const buy = async (e) => {
    e.preventDefault();
    let nonce = await data.instance.requestPaymentMethod();
    if (coupon && coupon !== null && coupon !== undefined) {
      process_payment(
        nonce,
        shipping_id,
        coupon.name,
        full_name,
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        postal_code,
        country,
        telephone_number
      );
    } else {
      process_payment(
        nonce,
        shipping_id,
        "",
        full_name,
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        postal_code,
        country,
        telephone_number
      );
    }
  };

  const showItems = () => {
    return (
      <div>
        {items &&
          items !== null &&
          items !== undefined &&
          items.length !== 0 &&
          items.map((item, index) => {
            let count = item.count;
            return (
              <div key={index}>
                <CartItem
                  item={item}
                  count={count}
                  update_item={update_item}
                  remove_item={remove_item}
                  render={render}
                  setRender={setRender}
                  setAlert={setAlert}
                />
              </div>
            );
          })}
      </div>
    );
  };

  const renderShipping = () => {
    if (shipping && shipping !== null && shipping !== undefined) {
      return (
        <div className="py-3 border-b border-gray-200">
          {shipping.map((shipping_option) => (
            <div key={shipping_option.id} className="py-1">
              <label className="flex gap-2">
                <input
                  onChange={(e) => onChange(e)}
                  value={shipping_option.id}
                  name="shipping_id"
                  type="radio"
                  required
                />
                {shipping_option.name}
              </label>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderPaymentInfo = () => {
    if (!clientToken) {
      if (!isAuthenticated) {
        <Link
          to="/login"
          className="w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
        >
          Login
        </Link>;
      } else {
        <button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
          <Loader type="Oval" color="#fff" height={20} widht={20} />
        </button>;
      }
    } else {
      return (
        <>
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <div className="mt-6">
            {loading ? (
              <button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                <Loader type="Oval" color="#fff" height={20} widht={20} />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
              >
                Place Order
              </button>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {showItems()}
              </ul>
            </section>

            {/* Order summary */}
            <ShippingForm
              full_name={full_name}
              address_line_1={address_line_1}
              address_line_2={address_line_2}
              city={city}
              state_province_region={state_province_region}
              postal_code={postal_code}
              telephone_number={telephone_number}
              country={country}
              onChange={onChange}
              buy={buy}
              user={user}
              renderShipping={renderShipping}
              total_amount={total_amount}
              total_compare_amount={total_compare_amount}
              shipping_cost={shipping_cost}
              shipping_id={shipping_id}
              shipping={shipping}
              renderPaymentInfo={renderPaymentInfo}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.counter.Auth.isAuthenticated,
  user: state.counter.Auth.user,
  items: state.counter.Cart.items,
  total_items: state.counter.Cart.total_items,
  shipping: state.counter.Shipping.shipping,
  clientToken: state.counter.Payment.clientToken,
  made_payment: state.counter.Payment.made_payment,
  loading: state.counter.Payment.loading,
  original_price: state.counter.Payment.original_price,
  total_amount: state.counter.Payment.total_amount,
  total_compare_amount: state.counter.Payment.total_compare_amount,
  shipping_cost: state.counter.Payment.shipping_cost,
});

export default connect(mapStateToProps, {
  remove_item,
  update_item,
  setAlert,
  get_shipping_options,
  refresh,
  get_payment_total,
  get_client_token,
  process_payment,
})(Checkout);
