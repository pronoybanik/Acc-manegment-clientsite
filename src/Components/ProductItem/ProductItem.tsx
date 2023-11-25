import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductItemQuery } from "../../Features/Products/ProductApi";
import { useCreateOrderMutation } from "../../Features/Orders/OrdersApi";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";

const ProductItem = () => {
  const { id } = useParams();

  const {
    data: productData,
    isError,
    isLoading,
    error,
  } = useGetProductItemQuery(id);

  const [
    createOrder,
    {
      isSuccess,
      isError: orderIsError,
      isLoading: orderLoading,
      error: orderError,
      data,
    },
  ] = useCreateOrderMutation();
  console.log(data);

  const [productQuantity, setProductQuantity] = useState(1);
  const userItem = localStorage.getItem("userId");
  const userId = userItem ? JSON.parse(userItem) : null;
  const navigate = useNavigate();

  // increment handler
  const handleIncrement = () => {
    setProductQuantity(productQuantity + 1);
  };

  // decrement handler
  const handleDecrement = () => {
    setProductQuantity(productQuantity - 1);
  };

  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <Errors>{error?.toString()}</Errors>;
  }
  if (!isLoading && !isError && productData.data.length === 0) {
    content = <Errors>{"There are no Video"}</Errors>;
  }
  if (!isLoading && !isError && productData.status === "success") {
    content = (
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        {/* product Image */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:ml-32 ">
          <img
            alt="Les Paul"
            src={productData?.data?.imageURLs}
            className="aspect-square w-[400px] rounded-xl object-contain"
          />

          <div className="grid grid-cols-2 gap-4 lg:mt-4">
            <img
              alt="Les Paul"
              src={productData?.data?.imageURLs}
              className="aspect-square w-full rounded-xl object-contain"
            />

            <img
              alt="Les Paul"
              src={productData?.data?.imageURLs}
              className="aspect-square w-full rounded-xl object-contain"
            />
          </div>
        </div>

        {/* product Data */}
        <div className="sticky top-0 lg:mt-10">
          <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text- font-medium tracking-wide text-blue-600">
            Name: {productData?.data?.name}
          </strong>

          <div className="mt-8 flex justify-between">
            <div className="max-w-[35ch] space-y-2">
              <div className="flex ">
                <div className="mb-2 text-xl font-medium mr-2">Category:</div>
                <div className="font-bold text-xl">
                  {productData?.data?.category}
                </div>
              </div>
              <div className="flex ">
                <div className="mb-2 text-xl font-medium mr-2">price:</div>
                <div className="font-bold text-xl font-sans">
                  {productData?.data?.price} TK
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
              {productData?.data?.description}
            </div>

            {/* product Countity counter */}
            <div className="flex mt-4 gap-4">
              <button onClick={handleIncrement}>+</button>
              <div className="border py-2 px-2 w-16 text-center">
                {productQuantity}
              </div>
              <button onClick={handleDecrement}>-</button>
            </div>

            <div
              className="mt-4"
              onClick={() => handleAddProduct(productData?.data?._id)}
            >
              <PrimaryButton>
                {orderLoading ? <div>Loading..</div> : <div>Add To Card</div>}
              </PrimaryButton>
            </div>
            <div>
              {orderIsError && <Errors>{orderError?.toString()}</Errors>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (isSuccess) {
      alert("Product is Add your card");
      navigate("/addCard");
    }
  }, [isSuccess, navigate]);

  const handleAddProduct = (id: string) => {
    const productId = id;
    const quantity = productQuantity;
    setTimeout(() => {
      createOrder({
        productId,
        quantity,
        userId,
      });
    }, 1000);
  };

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-8 font-serif">
      {content}
    </div>
  );
};

export default ProductItem;
