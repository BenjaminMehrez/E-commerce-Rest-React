import { useEffect, useState } from "react";
import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { get_categories } from "../../redux/actions/categories";
import {
  get_products,
  get_filtered_products,
} from "../../redux/actions/products";

import { prices } from "../../helpers/fixedPrices";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import ProductCard from "../../components/product/ProductCard";

function SearchPage({
  get_categories,
  categories,
  get_products,
  products,
  get_filtered_products,
  filtered_products,
  searched_products,
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "0",
    price_range: "Any",
    sortBy: "created",
    order: "desc",
  });

  const { category_id, price_range, sortBy, order } = formData;

  useEffect(() => {
    get_categories();
    get_products();
    window.scrollTo(0, 0);
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    get_filtered_products(category_id, price_range, sortBy, order);
    setFiltered(true);
  };

  const showProducts = () => {
    let results = [];
    let display = [];


    if (
      filtered_products &&
      filtered_products !== null &&
      filtered_products !== undefined &&
      filtered
    ) {
      filtered_products.map((product) => {
        return display.push(<ProductCard key={product.id} product={product} />);
      });
    } else if (
      searched_products &&
      searched_products !== null &&
      searched_products !== undefined
    ) {
      searched_products.map((product) => {
        return display.push(<ProductCard key={product.id} product={product} />);
      });
    }

    for (let i = 0; i < display.length; i += 3) {
      results.push(
        <div key={i} className="grid md:grid-cols-3 ">
          {display[i] ? display[i] : <div className=""></div>}
          {display[i + 1] ? display[i + 1] : <div className=""></div>}
          {display[i + 2] ? display[i + 2] : <div className=""></div>}
        </div>
      );
    }

    return results;
  };

  return (
    <Layout>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Filters */}
                <form
                  onSubmit={(e) => onSubmit(e)}
                  className="mt-4 border-t border-gray-200"
                >
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    {categories &&
                      categories !== null &&
                      categories !== undefined &&
                      categories.map((category) => {
                        if (category.sub_categories.length === 0) {
                          return (
                            <div
                              key={category.id}
                              className=" flex items-center h-5 my-5"
                            >
                              <input
                                name="category_id"
                                onChange={(e) => onChange(e)}
                                value={category.id.toString()}
                                type="radio"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                              />
                              <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                {category.name}
                              </label>
                            </div>
                          );
                        } else {
                          let result = [];
                          result.push(
                            <div
                              key={category.id}
                              className="flex items-center h-5"
                            >
                              <input
                                name="category_id"
                                onChange={(e) => onChange(e)}
                                value={category.id.toString()}
                                type="radio"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                              />
                              <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                {category.name}
                              </label>
                            </div>
                          );

                          category.sub_categories.map((sub_category) => {
                            result.push(
                              <div
                                key={sub_category.id}
                                className="flex items-center h-5 ml-2 my-5"
                              >
                                <input
                                  name="category_id"
                                  onChange={(e) => onChange(e)}
                                  value={sub_category.id.toString()}
                                  type="radio"
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                />
                                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                  {sub_category.name}
                                </label>
                              </div>
                            );
                          });

                          return result;
                        }
                      })}
                  </ul>

                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-sofiapro-regular text-gray-900">
                              Prices
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {prices &&
                                prices.map((price, index) => {
                                  if (price.id === 0) {
                                    return (
                                      <div key={index} className="form-check">
                                        <input
                                          onChange={(e) => onChange(e)}
                                          value={price.name}
                                          name="price_range"
                                          type="radio"
                                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                          defaultChecked
                                        />
                                        <label className="ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light">
                                          {price.name}
                                        </label>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div key={index} className="form-check">
                                        <input
                                          onChange={(e) => onChange(e)}
                                          value={price.name}
                                          name="price_range"
                                          type="radio"
                                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                        />
                                        <label className="ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light">
                                          {price.name}
                                        </label>
                                      </div>
                                    );
                                  }
                                })}
                            </div>
                          </Disclosure.Panel>
                        </h3>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-sofiapro-regular text-gray-900">
                              Mas Filtros
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              <div className="form-group ">
                                <label
                                  htmlFor="sortBy"
                                  className="mr-3 min-w-0 flex-1 text-gray-500"
                                >
                                  Ver por
                                </label>
                                <select
                                  className="my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                  id="sortBy"
                                  name="sortBy"
                                  onChange={(e) => onChange(e)}
                                  value={sortBy}
                                >
                                  <option value="date_created">Fecha</option>
                                  <option value="price">Precio</option>
                                  <option value="sold">Sold</option>
                                  <option value="title">Nombre</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="order"
                                  className="mr-3 min-w-0 flex-1 text-gray-500"
                                >
                                  Orden
                                </label>
                                <select
                                  className="my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                  id="order"
                                  name="order"
                                  onChange={(e) => onChange(e)}
                                  value={order}
                                >
                                  <option value="asc">A - Z</option>
                                  <option value="desc">Z - A</option>
                                </select>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </h3>
                      </>
                    )}
                  </Disclosure>

                  <button
                    type="submit"
                    className="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Buscar
                  </button>
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Productos encontrados { searched_products && searched_products !== null && searched_products !== undefined && searched_products.length} 
              </h1>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form onSubmit={(e) => onSubmit(e)} className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {categories &&
                      categories !== null &&
                      categories !== undefined &&
                      categories.map((category) => {
                        if (category.sub_categories.length === 0) {
                          return (
                            <div
                              key={category.id}
                              className=" flex items-center h-5 my-5"
                            >
                              <input
                                name="category_id"
                                onChange={(e) => onChange(e)}
                                value={category.id.toString()}
                                type="radio"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                              />
                              <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                {category.name}
                              </label>
                            </div>
                          );
                        } else {
                          let result = [];
                          result.push(
                            <div
                              key={category.id}
                              className="flex items-center h-5"
                            >
                              <input
                                name="category_id"
                                onChange={(e) => onChange(e)}
                                value={category.id.toString()}
                                type="radio"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                              />
                              <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                {category.name}
                              </label>
                            </div>
                          );

                          category.sub_categories.map((sub_category) => {
                            result.push(
                              <div
                                key={sub_category.id}
                                className="flex items-center h-5 ml-2 my-5"
                              >
                                <input
                                  name="category_id"
                                  onChange={(e) => onChange(e)}
                                  value={sub_category.id.toString()}
                                  type="radio"
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                />
                                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                  {sub_category.name}
                                </label>
                              </div>
                            );
                          });

                          return result;
                        }
                      })}
                  </ul>

                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-sofiapro-regular text-gray-900">
                              Prices
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {prices &&
                                prices.map((price, index) => {
                                  if (price.id === 0) {
                                    return (
                                      <div key={index} className="form-check">
                                        <input
                                          onChange={(e) => onChange(e)}
                                          value={price.name}
                                          name="price_range"
                                          type="radio"
                                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                          defaultChecked
                                        />
                                        <label className="ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light">
                                          {price.name}
                                        </label>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div key={index} className="form-check">
                                        <input
                                          onChange={(e) => onChange(e)}
                                          value={price.name}
                                          name="price_range"
                                          type="radio"
                                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                        />
                                        <label className="ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light">
                                          {price.name}
                                        </label>
                                      </div>
                                    );
                                  }
                                })}
                            </div>
                          </Disclosure.Panel>
                        </h3>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-sofiapro-regular text-gray-900">
                              Mas Filtros
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              <div className="form-group ">
                                <label
                                  htmlFor="sortBy"
                                  className="mr-3 min-w-0 flex-1 text-gray-500"
                                >
                                  Ver por
                                </label>
                                <select
                                  className="my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                  id="sortBy"
                                  name="sortBy"
                                  onChange={(e) => onChange(e)}
                                  value={sortBy}
                                >
                                  <option value="date_created">Fecha</option>
                                  <option value="price">Precio</option>
                                  <option value="sold">Sold</option>
                                  <option value="title">Nombre</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="order"
                                  className="mr-3 min-w-0 flex-1 text-gray-500"
                                >
                                  Orden
                                </label>
                                <select
                                  className="my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                  id="order"
                                  name="order"
                                  onChange={(e) => onChange(e)}
                                  value={order}
                                >
                                  <option value="asc">A - Z</option>
                                  <option value="desc">Z - A</option>
                                </select>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </h3>
                      </>
                    )}
                  </Disclosure>

                  <button
                    type="submit"
                    className="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Buscar
                  </button>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {products && showProducts()}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  categories: state.counter.Categories.categories,
  products: state.counter.Products.products,
  searched_products: state.counter.Products.search_products,
  filtered_products: state.counter.Products.filtered_products,
});

export default connect(mapStateToProps, {
  get_categories,
  get_products,
  get_filtered_products,
})(SearchPage);
