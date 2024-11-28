import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { CheckForConnection } from "./middleWares/checkConnection";

export default function App() {
  CheckForConnection()
  return (
    <div >

    <RouterProvider router={router} />
  </div>
  );
}
