import { createBrowserRouter } from "react-router-dom";

const AllRouters = createBrowserRouter([
  {
    path: "/",
    element: "Main page",
    errorElement: "Error page",
    children: [
      {
        path: "/",
        element: "Home page",
      },
    ],
  },
]);

export default AllRouters;
