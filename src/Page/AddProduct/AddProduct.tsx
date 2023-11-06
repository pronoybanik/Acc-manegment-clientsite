import React from "react";

const AddProduct = () => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="text-3xl my-2">Add Product </p>
            <p className="max-w-xl text-lg">
              At the same time, the fact that we are wholly owned and totally
              independent from manufacturer and other group control gives you
              confidence that we will only recommend what is right for you.
            </p>

            <div className="mt-8">
              <a href="" className="text-2xl font-bold text-pink-600">
                0151 475 4450
              </a>

              <address className="mt-2 not-italic">
                282 Kevin Brook, Imogeneborough, CA 58517
              </address>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Product Name"
                  type="text"
                  id="name"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="category">
                    category
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="category"
                    type="text"
                    id="category"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="unit">
                    unit
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="unit"
                    type="text"
                    id="unit"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 text-center">
                <div>
                  <input
                    className="peer sr-only"
                    id="option1"
                    type="radio"
                    name="option"
                  />

                  <label
                    htmlFor="option1"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                  >
                    <span className="text-sm"> Fresh </span>
                  </label>
                </div>

                <div>
                  <input
                    className="peer sr-only"
                    id="option2"
                    type="radio"
                    name="option"
                  />

                  <label
                    htmlFor="option2"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                  >
                    <span className="text-sm"> Dove </span>
                  </label>
                </div>

                <div>
                  <input
                    className="peer sr-only"
                    id="option3"
                    type="radio"
                    name="option"
                  />

                  <label
                    htmlFor="option3"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                  >
                    <span className="text-sm"> Rup cada </span>
                  </label>
                </div>

                <div>
                  <input
                    className="peer sr-only"
                    id="option4"
                    type="radio"
                    name="option"
                  />

                  <label
                    htmlFor="option4"
                    className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                  >
                    <span className="text-sm"> Aci </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Description
                </label>

                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Description"
                  id="description"
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
