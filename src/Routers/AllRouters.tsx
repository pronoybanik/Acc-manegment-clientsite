import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main/Main";
import ErrorPage from "../Page/ErrorPage/ErrorPage";
import Home from "../Page/Home/Home";

const AllRouters = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

export default AllRouters;
