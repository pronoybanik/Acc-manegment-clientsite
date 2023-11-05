import "./App.css";
import { RouterProvider } from "react-router-dom";
import AllRouters from "./Routers/AllRouters";
// import { BiArrowFromBottom } from "react-icons/bi";

function App() {
  return (
    <div className="max-w-[1640px] mx-auto ">
      <RouterProvider router={AllRouters} />

      {/* <div className="fixed inset-x-0 bottom-0 p-4">
        <div className="rounded-lg bg-black  px-4 py-3 text-white shadow-lg">
         
          <BiArrowFromBottom />
        </div>
      </div> */}
    </div>
    // BiArrowFromBottom
  );
}

export default App;
