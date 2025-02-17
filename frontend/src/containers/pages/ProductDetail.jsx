import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_product, get_related_products } from "../../redux/actions/products";
import Layout from "../../hocs/Layout";
import ImageGallery from "../../components/product/ImageGallery";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  
  const product = useSelector((state) => state.counter.Products.product);

  useEffect(() => {
    dispatch(get_product(productId));
    dispatch(get_related_products(productId));
  }, [dispatch, productId]);

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

              <div className="mt-6 text-base text-gray-700 space-y-6" 
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
                <button className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
