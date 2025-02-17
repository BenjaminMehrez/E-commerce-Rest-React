import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_products_by_arrival,
  get_products_by_sold,
} from "../redux/actions/products";
import Layout from "../hocs/Layout";
import Banner from "../components/home/Banner";
import ProductsArrival from "../components/home/ProductsArrival";
import ProductsSold from "../components/home/ProductsSold";

const Home = () => {
  const dispatch = useDispatch();

  const products_arrival = useSelector(
    (state) => state.counter.Products.products_arrival
  );
  const products_sold = useSelector(
    (state) => state.counter.Products.products_sold
  );

  useEffect(() => {
    dispatch(get_products_by_arrival());
    dispatch(get_products_by_sold());
  }, [dispatch]);

  return (
    <Layout>
      <div className="text-blue-500">
        <Banner />
        {products_arrival && <ProductsArrival data={products_arrival} />}
        {products_sold && <ProductsSold data={products_sold} />}
      </div>
    </Layout>
  );
};

export default Home;
