import { Link, useParams } from "react-router-dom";
import { useGetBrandItemQuery } from "../../Features/Brands/BrandsAPi";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";

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
  price: number;
  __v: number;
  _id: string;
}



const BrandItem = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetBrandItemQuery(id);

  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <Errors>{error?.toString()}</Errors>;
  }
  if (!isLoading && !isError && data.data.length === 0) {
    content = <Errors>{"There are no Brand"}</Errors>;
  }
  if (!isLoading && !isError && data.status === "success") {
    content = (
      <>
        {/* product items Data */}
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:ml-32">
            <img
              alt="Les Paul"
              src={data?.data?.image}
              className="aspect-square w-[350px] rounded-xl object-cover"
            />
          </div>

          <div className="sticky top-0 lg:mt-10">
            <strong className="rounded-full text-2xl border border-blue-600 bg-gray-100 px-3 py-0.5 text- font-medium tracking-wide text-blue-600">
              Name: {data?.data?.name}
            </strong>

            <div className="mt-4 flex justify-between">
              <div className="max-w-[35ch] space-y-2">
                <div className="flex">
                  <div className=" text-xl font-medium mr-2">Location:</div>
                  <div className="font-bold text-xl">
                    {data?.data?.location}
                  </div>
                </div>
                <div className="flex ">
                  <div className="mb-2 text-xl font-medium mr-2">Status:</div>
                  <div className="font-bold text-xl font-sans text-red-600">
                    {data?.data?.status}
                  </div>
                </div>

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
            </div>

            <div className="mt-4">
              <div className="prose max-w-none">
                <p className="mb-2 text-lg font-medium">About:</p>
                {data?.data?.description}
              </div>

              {/* <button className="mt-2 text-sm font-medium underline">Read More</button> */}
            </div>
          </div>
        </div>

        {/* Brand Related Products Data  */}
        <div>
          <div className="my-14">
            <div className="text-5xl flex items-center justify-center  font-serif">
              Brand Related Product
            </div>
            <p className="border-b-2 border-[#98CB4C] mx-auto w-14 mt-4" />
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {data?.data?.products?.length === 0 ? (
              <Errors>Create A Products</Errors>
            ) : (
              data?.data?.products?.map((data: Product) => (
                <section key={data?._id} className="border-2 p-4 mt-4 h-full">
                  <Link
                    key={data?._id}
                    to={`/product/${data?._id}`}
                    className="group block"
                  >
                    <img
                      src={data?.imageURLs}
                      alt=""
                      className="h-full object-contain w-full"
                    />

                    <div className="mt-3 flex justify-between text-sm">
                      <div>
                        <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                          {data?.category}
                        </h3>

                        <p className="mt-1.5 max-w-[45ch] text-xs text-gray-500">
                          {data?.name}
                        </p>
                      </div>

                      <p className="text-gray-900">price:{data?.price} TK</p>
                    </div>
                  </Link>
                </section>
              ))
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-8">{content}</div>
  );
};

export default BrandItem;
