import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  get_product,
  get_related_products,
} from "../../redux/actions/products";
import {
  get_items,
  get_item_total,
  get_total,
  add_item,
} from "../../redux/actions/cart";
import Layout from "../../hocs/Layout";
import ImageGallery from "../../components/product/ImageGallery";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const ProductDetail = ({
  get_product,
  get_related_products,
  product,
  get_items,
  add_item,
  get_total,
  get_item_total,
}) => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get_product(productId);
    get_related_products(productId);
  }, [productId]);

  const addToCart = async () => {
    if (
      product &&
      product !== null &&
      product !== undefined &&
      product.quantity > 0
    ) {
      setLoading(true);
      await add_item(product);
      await get_items();
      await get_total();
      await get_item_total();
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {product && <ImageGallery photo={product.photo} />}

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product?.name}
              </h1>

              <div className="mt-3">
                <p className="text-3xl text-gray-900">${product?.price}</p>
              </div>

              <div
                className="mt-6 text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />

              <p className="mt-4">
                {product?.quantity > 0 ? (
                  <span className="text-green-500">In Stock</span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </p>

              <div className="mt-4 flex sm:flex-col1">
                {loading ? (
                  <button className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                    <ClipLoader
                      type="Oval"
                      color="#fff"
                      width={20}
                      height={20}
                    />
                  </button>
                ) : (
                  <button
                    onClick={addToCart}
                    className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                  >
                    Agregar al Carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  product: state.counter.Products.product,
});

export default connect(mapStateToProps, {
  get_related_products,
  get_product,
  get_items,
  get_item_total,
  get_total,
  add_item,
})(ProductDetail);
