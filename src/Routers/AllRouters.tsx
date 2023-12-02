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
// import AddStore from "../Page/AddStore/AddStore";
import AddSupplier from "../Page/AddSupplier/AddSupplier";
import ManagerDashBoard from "../LayOut/ManagerDashBoard/ManagerDashBoard";
import AllOrder from "../Page/AllOrder/AllOrder";
import AllUser from "../Page/AllUser/AllUser";
import AllSupplier from "../Page/AllSupplier/AllSupplier";
import CreateStock from "../Page/CreateStock/CreateStock";
import AllStock from "../Page/AllStock/AllStock";
import AllProducts from "../Page/AllProducts/AllProducts";
import PrivateRoute from "../Shared/privateRoute/PrivateRoute";
import LogIn from "../Page/Login/Login";
import ManagerPrivateRoute from "../Shared/ManagerPrivateRoute/ManagerPrivateRoute";

const AllRouters = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/brands",
        element: <Brands />,
      },
      { path: "/brands/:id", element: <BrandItem /> },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductItem />
          </PrivateRoute>
        ),
      },
      {
        path: "/addCard",
        element: (
          <PrivateRoute>
            <AddCard />
          </PrivateRoute>
        ),
      },
      { path: "/allProducts", element: <AllProducts /> },
      { path: "/login", element: <LogIn /> },
      { path: "/blog", element: "blog" },
    ],
  },
  {
    path: "/managerDashBoard",
    element: (
      // <ManagerPrivateRoute>
      <ManagerDashBoard />
      //  </ManagerPrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/managerDashBoard/allBrand", element: <Brands /> },
      {
        path: "/managerDashBoard/allOrder",
        element: <AllOrder />,
      },
      {
        path: "/managerDashBoard/allUser",
        element: <AllUser />,
      },
      {
        path: "/managerDashBoard/allSupplier",
        element: <AllSupplier />,
      },
      {
        path: "/managerDashBoard/createStock",
        element: <CreateStock />,
      },
      {
        path: "/managerDashBoard/allStock",
        element: <AllStock />,
      },
      {
        path: "/managerDashBoard/createSupplier",
        element: <AddSupplier />,
      },
      {
        path: "/managerDashBoard/createProduct",
        element: <AddProduct />,
      },
      {
        path: "/managerDashBoard/createBrand",
        element: <AddBrand />,
      },
    ],
  },
]);

export default AllRouters;
