import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { CheckForConnection } from "./middleWares/checkConnection";
import { SideBarProvider } from "./contexts/SideBarContext";

export default function App() {
  CheckForConnection()
  return (
    <div >
      <SideBarProvider>

        <RouterProvider router={router} />
      </SideBarProvider>

    </div>
  );
}
