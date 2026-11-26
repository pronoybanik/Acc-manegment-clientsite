import "./App.css";
import { RouterProvider } from "react-router-dom";
import AllRouters from "./Routers/AllRouters";
// import { BiArrowFromBottom } from "react-icons/bi";

function App() {
  return (
    <div className="mx-auto max-w-[1640px] font-sans">
      <RouterProvider router={AllRouters} />
    </div>
  );
}

export default App;
