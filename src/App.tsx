import "./App.css";
import { RouterProvider } from "react-router-dom";
import AllRouters from "./Routers/AllRouters";
function App() {
  return (
    <div>
      <RouterProvider router={AllRouters}></RouterProvider>
    </div>
  );
}

export default App;
