import "./App.css";
import { RouterProvider } from "react-router-dom";
import AllRouters from "./Routers/AllRouters";

function App() {
  return (
    <div className="max-w-[1640px] mx-auto ">
      <RouterProvider router={AllRouters} />
    </div>
  );
}

export default App;
