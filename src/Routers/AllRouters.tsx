import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main/Main";
import ErrorPage from "../Page/ErrorPage/ErrorPage";
import Home from "../Page/Home/Home";
import Brands from "../Page/Brands/Brands";
import BrandItem from "../Page/BrandItem/BrandItem";
import ProductItem from "../Components/ProductItem/ProductItem";
import AddProduct from "../Page/AddProduct/AddProduct";
import AddBrand from "../Page/AddBrand/AddBrand";
import AddCard from "../Page/AddCard/AddCard";
import AddStore from "../Page/AddStore/AddStore";
import AddSupplier from "../Page/AddSupplier/AddSupplier";
import ManagerDashBoard from "../LayOut/ManagerDashBoard/ManagerDashBoard";
import AllOrder from "../Page/AllOrder/AllOrder";

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
      { path: "/addProduct", element: <AddProduct /> },
      { path: "/addBrand", element: <AddBrand /> },
      { path: "/addCard", element: <AddCard /> },
      { path: "/addStore", element: <AddStore /> },
      { path: "/addSupplier", element: <AddSupplier /> },
    ],
  },
  {
    path: "/managerDashBoard",
    element: <ManagerDashBoard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/managerDashBoard/allBrand", element: <Brands /> },
      {
        path: "/managerDashBoard/allOrder",
        element: <AllOrder />,
      },
    ],
  },
]);

export default AllRouters;
