import Layout from "../../hocs/Layout";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  get_product,
  get_related_products,
} from "../../redux/actions/products";
import { useEffect } from "react";
import { useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { HeartIcon, PlusSmallIcon, StarIcon } from "@heroicons/react/24/solid";
import ImageGallery from "../../components/product/ImageGallery";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetail({ get_related_products, get_product, product }) {
  useEffect(() => {
    get_product(productId);
    get_related_products(productId);
  });
  const params = useParams();
  const productId = params.productId;
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <ImageGallery photo={product && product.photo} />

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product && product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  $ {product && product.price}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: product && product.description,
                  }}
                />
              </div>

              <div className="mt-6">
                <div>
                  <h3 className="text-sm text-gray-600">Color</h3>

                  <fieldset className="mt-2">
                    <legend className="sr-only">Choose a color</legend>
                    <div className="flex items-center space-x-3">
                      <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-700">
                        <input
                          type="radio"
                          name="color-choice"
                          value="Washed Black"
                          className="sr-only"
                          aria-labelledby="color-choice-0-label"
                        />
                        <p id="color-choice-0-label" className="sr-only">
                          Washed Black
                        </p>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-gray-700 border border-black border-opacity-10 rounded-full"
                        ></span>
                      </label>

                      <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                        <input
                          type="radio"
                          name="color-choice"
                          value="White"
                          className="sr-only"
                          aria-labelledby="color-choice-1-label"
                        />
                        <p id="color-choice-1-label" className="sr-only">
                          White
                        </p>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-white border border-black border-opacity-10 rounded-full"
                        ></span>
                      </label>

                      <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-500">
                        <input
                          type="radio"
                          name="color-choice"
                          value="Washed Gray"
                          className="sr-only"
                          aria-labelledby="color-choice-2-label"
                        />
                        <p id="color-choice-2-label" className="sr-only">
                          Washed Gray
                        </p>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-gray-500 border border-black border-opacity-10 rounded-full"
                        ></span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                <p className="mt-4">
                  {product &&
                  product !== null &&
                  product !== undefined &&
                  product.quantity > 0 ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </p>

                <div className="mt-4 flex sm:flex-col1">
                    <button
                      className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                      Agregar al Carrito
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  product: state.counter.Products.product,
});

export default connect(mapStateToProps, {
  get_related_products,
  get_product,
})(ProductDetail);
