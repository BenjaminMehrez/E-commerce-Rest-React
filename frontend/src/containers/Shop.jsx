import { useEffect, useState } from "react";
import Layout from "../hocs/Layout";
import { connect } from "react-redux";
import { get_categories } from "../redux/actions/categories";
import { get_products, get_filtered_products } from "../redux/actions/products";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Shop({
  get_categories,
  categories,
  get_products,
  products,
  get_filtered_products,
  filtered_products,
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
        return display.push(
          <div key={product.id}>
              producto filtrado
          </div>
        )
        
      })
    } 
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
                <form className="mt-4 border-t border-gray-200">
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

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Lo Nuevo
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
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
                <form className="hidden lg:block">
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

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white">
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Los clientes también compraron
                      </h2>

                      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products &&
                          products.map((product) => (
                            <div key={product.id} className="group relative">
                              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                <img
                                  src={`${import.meta.env.VITE_API_URL}${
                                    product.photo
                                  }`}
                                  alt=""
                                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                              </div>
                              <div className="mt-4 flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                    <Link to={"/product/" + product.id}>
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                      />
                                      {product.name}
                                    </Link>
                                  </h3>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  {product.price}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
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
  filtered_products: state.counter.Products.filtered_products,
});

export default connect(mapStateToProps, {
  get_categories,
  get_products,
  get_filtered_products,
})(Shop);
