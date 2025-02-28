import { useEffect } from "react";
import Layout from "../../hocs/Layout";
import CartItem from "../../components/cart/CartItem";
import { setAlert } from "../../redux/actions/alert";
import { get_shipping_options } from "../../redux/actions/shipping";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  remove_item,
  update_item,
  get_items,
  get_total,
  get_item_total,
} from "../../redux/actions/cart";
import { useState } from "react";

function Checkout({
  get_items,
  get_total,
  get_item_total,
  isAuthenticated,
  items,
  amount,
  compare_amount,
  total_items,
  remove_item,
  update_item,
  setAlert,
  get_shipping_options,
  shipping,
}) {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state_province_region: "",
    postal_code: "",
    country: "Argentina",
    telephone_number: "",
    coupon_name: "",
    shipping_id: 0,
  });

  const {
    full_name,
    address_line1,
    address_line2,
    city,
    state_province_region,
    postal_code,
    country,
    telephone_number,
    coupon_name,
    shipping_id,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    get_shipping_options();
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
        <div className="">
          {shipping.map((shipping_option) => (
            <div key={shipping_option.id}>
              <label className="flex gap-2">
                <input
                  onChange={(e) => onChange(e)}
                  value={shipping_option.id}
                  name="shipping_id"
                  type="radio"
                  required
                />
                {shipping_option.name} - ${shipping_option.price} (
                {shipping_option.time_to_delivery})
              </label>
            </div>
          ))}
        </div>
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
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              {renderShipping()}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.counter.Auth.isAuthenticated,
  items: state.counter.Cart.items,
  amount: state.counter.Cart.amount,
  compare_amount: state.counter.Cart.compare_amount,
  total_items: state.counter.Cart.total_items,
  shipping: state.counter.Shipping.shipping,
});

export default connect(mapStateToProps, {
  get_items,
  get_total,
  get_item_total,
  remove_item,
  update_item,
  setAlert,
  get_shipping_options,
})(Checkout);
