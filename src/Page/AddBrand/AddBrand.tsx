import React from "react";
import { useCreateBrandMutation } from "../../Features/Brands/BrandsAPi";

const AddBrand = () => {
  const [createBrand] = useCreateBrandMutation();

  const handleBrandSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      brandName: { value: string };
      location: { value: string };
      brandImage: { files: FileList };
      description: { value: string };
    };

    const brandName = target.brandName.value;
    const location = target.location.value;
    const brandImage = target.brandImage.files[0];
    const description = target.description.value;

    const formData = new FormData();
    formData.append("image", brandImage);

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
      const brandImageUrl = imgData.data.url;
      createBrand({
        name: brandName,
        description: description,
        location: location,
        image: brandImageUrl,
      });
      alert("Create data");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="text-3xl my-2">Add Brand </p>

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
            <form onSubmit={handleBrandSubmit} className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Brand Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Brand Name"
                  type="text"
                  name="brandName"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="location">
                    Location
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="location"
                    type="text"
                    name="location"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="unit">
                    Brand Image
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="Brand Image"
                    type="file"
                    name="brandImage"
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Description
                </label>

                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Description Brand"
                  name="description"
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

export default AddBrand;
