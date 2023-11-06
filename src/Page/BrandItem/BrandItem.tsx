import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetBrandItemQuery } from "../../Features/Brands/BrandsAPi";

interface Product {
  brand: {
    name: string;
    id: string;
  };
  category: string;
  createdAt: string;
  description: string;
  imageURLs: string;
  name: string;
  unit: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

// interface brand {
//   createdAt: string;
//   description: string;
//   email: string;
//   location: string;
//   name: string;
//   products: Product[];
//   status: string;
//   suppliers: string[]; // You can specify the correct type for suppliers if needed
//   updatedAt: string;
//   __v: number;
//   _id: string;
// }

const BrandItem = () => {
  const { id } = useParams();
  const { data } = useGetBrandItemQuery(id);
  console.log(data?.data);

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-8">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:ml-20 lg:mt-20">
          <img
            alt="Les Paul"
            src={data?.data?.image}
            className="aspect-square w-[400px] rounded-xl object-cover"
          />

          {/* <div className="grid grid-cols-2 gap-4 lg:mt-4">
            <img
              alt="Les Paul"
              src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="aspect-square w-full rounded-xl object-cover"
            />

            <img
              alt="Les Paul"
              src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="aspect-square w-full rounded-xl object-cover"
            />

            <img
              alt="Les Paul"
              src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="aspect-square w-full rounded-xl object-cover"
            />

            <img
              alt="Les Paul"
              src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="aspect-square w-full rounded-xl object-cover"
            />
          </div> */}
        </div>

        <div className="sticky top-0">
          <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text- font-medium tracking-wide text-blue-600">
            Per Hour Charge - PerHourCharge
          </strong>

          <div className="mt-8 flex justify-between">
            <div className="max-w-[35ch] space-y-2">
              <h1 className="text-xl font-bold sm:text-2xl">
                FirstName LastName
              </h1>

              {/* <p className="text-lg font-semibold">{DoctorType}</p> */}
              <p className="text-sm font-semibold">MobileNumber:</p>

              {/* starts */}
              <div className="-ms-0.5 flex">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  className="h-5 w-5 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            {/* <p className="text-lg font-bold uppercase">Per Hour Charge - {PerHourCharge}</p> */}
          </div>

          <div className="mt-4">
            <div className="prose max-w-none">
              {/* <p>{About}</p> */}
              <p>About</p>
            </div>

            {/* <button className="mt-2 text-sm font-medium underline">Read More</button> */}
          </div>

          <form className="mt-8">
            <fieldset>
              <legend className="mb-2 text-lg font-medium">
                Appointment status
              </legend>

              <div className="flex flex-wrap gap-1">
                <label htmlFor="color_tt" className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    id="color_tt"
                    className="peer sr-only"
                  />

                  <span className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                    new appointment
                  </span>
                </label>

                <label htmlFor="color_fr" className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    id="color_fr"
                    className="peer sr-only"
                  />

                  <span className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                    old appointment
                  </span>
                </label>

                <label htmlFor="color_cb" className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    id="color_cb"
                    className="peer sr-only"
                  />

                  <span className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                    Cobalt Blue
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset className="mt-4">
              <legend className="mb-2 text-lg font-medium">
                Appointment time
              </legend>

              <div className="flex flex-wrap gap-1">
                <label htmlFor="size_xs" className="cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    id="size_xs"
                    className="peer sr-only"
                  />

                  <span className="group w-36 inline-flex h-8  items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                    {/* {WorkingHour} */}
                    WorkingHour
                  </span>
                </label>
              </div>
            </fieldset>

            {/* <Link to="/bookAppointment" className="mt-8 flex gap-4">
          <SecondaryButton>set appointment</SecondaryButton>
        </Link> */}
          </form>
        </div>
      </div>

      <div>
        <div className="my-14">
          <div className="text-5xl flex items-center justify-center  font-serif">
            Brand Related Product
          </div>
          <p className="border-b-2 border-[#98CB4C] mx-auto w-14 mt-4" />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {data?.data?.products?.map((data: Product) => (
            <Link key={data?._id} to="#" className="group block">
              <div className="relative h-[350px] sm:h-[450px]">
                <img
                  src={data?.imageURLs}
                  alt=""
                  // className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                  className="absolute inset-0 h-full w-full "
                />

                {/* <img
                  src="https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                /> */}
              </div>

              <div className="mt-3">
                <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  {data?.category}
                </h3>

                <p className="mt-1.5 max-w-[40ch] text-xs text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  quibusdam ab maiores placeat odio id?
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandItem;
