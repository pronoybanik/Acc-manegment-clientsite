import React from "react";
import { useGetBrandQuery } from "../../Features/Brands/BrandsAPi";
import { useCreateProductMutation } from "../../Features/Products/ProductApi";

type BrandData = {
  _id: string;
  name: string;
  description: string;
  email: string;
  location: string;
  products: {
    brand: {
      name: string;
      id: string;
    };
    _id: string;
    name: string;
    description: string;
    unit: string;
    imageURLs: string[];
    category: string;
    createdAt: string;
    updatedAt: string;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  image: string;
};

const AddProduct = () => {
  const { data: brandData } = useGetBrandQuery({});
  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      productName: { value: string };
      category: { value: string };
      unit: { value: string };
      option: { value: string };
      description: { value: string };
      productImage: { files: FileList };
    };

    const productName = target.productName.value;
    const category = target.category.value;
    const unit = target.unit.value;
    const BrandId = target.option.value;
    const description = target.description.value;
    const productImage = target.productImage.files[0];
    console.log(
      productName,
      category,
      unit,
      BrandId,
      description,
      productImage
    );

    const formData = new FormData();
    formData.append("image", productImage);

    const url =
      "https://api.imgbb.com/1/upload?key=99f58a547dc4b1d269148eb1b605ef29";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const imgData = await response.json();
      const productImageUrl = imgData.data.url;
      createProduct({
        name: productName,
        description: description,
        brand: {
          id: BrandId,
        },
        category: category,
        unit: unit,
        imageURLs: productImageUrl,
      });
      alert("Create product data");
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <form
              onSubmit={handleCreateProduct}
              action=""
              className="space-y-4"
            >
              <div>
                <label className="sr-only" htmlFor="name">
                  product Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Product Name"
                  type="text"
                  id="name"
                  name="productName"
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
                    name="category"
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
                    name="unit"
                    id="unit"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 text-center">
                {brandData?.data?.map((data: BrandData, index: number) => (
                  <div key={data?._id}>
                    <input
                      className="peer sr-only"
                      id={`option${index + 1}`}
                      type="radio"
                      name="option"
                      defaultValue={data?._id}
                    />
                    <label
                      htmlFor={`option${index + 1}`}
                      className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    >
                      <span className="text-sm"> {data?.name} </span>
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Description
                </label>

                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Description"
                  id="description"
                  name="description"
                ></textarea>
              </div>

              <div>
                <label className="sr-only" htmlFor="unit">
                  image
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="productImage"
                  type="file"
                  name="productImage"
                  id="productImage"
                />
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
