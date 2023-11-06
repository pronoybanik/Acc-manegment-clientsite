import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main/Main";
import ErrorPage from "../Page/ErrorPage/ErrorPage";
import Home from "../Page/Home/Home";
import Brands from "../Page/Brands/Brands";
import BrandItem from "../Page/BrandItem/BrandItem";
import ProductItem from "../Components/ProductItem/ProductItem";

const AllRouters = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/brands", element: <Brands /> },
      { path: "/brands/:id", element: <BrandItem /> },
      { path: "/product/:id", element: <ProductItem /> },
    ],
  },
  
]);

export default AllRouters;
