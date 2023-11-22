import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";

axios.defaults.baseURL = "http://localhost:5174";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create",
      element: <CreateUser />,
    },
    {
      path: "/update/:params",
      element: <UpdateUser />,
    },
  ]);
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
};
export default App;
