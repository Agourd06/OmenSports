import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { CheckForConnection } from "./middleWares/checkConnection";
import { SideBarProvider } from "./contexts/SideBarContext";
import Alert from "./shared/Alert";
import { AuthProvider } from "./contexts/AuthContext";
import { createContext, useState } from "react";
export const AlertContext = createContext()

export default function App() {
  const [alert, setAlert] = useState(null);
  const handleShowAlert = (type, text) => {
    setAlert({ type, text });
    setTimeout(() => { setAlert(null) }, 2000);
  }
  CheckForConnection()
  return (
    <div >

      <AlertContext.Provider value={handleShowAlert}>
        <AuthProvider>
          <SideBarProvider>
            <RouterProvider router={router} />
          </SideBarProvider>
        </AuthProvider>
      </AlertContext.Provider>
      {alert && <Alert type={alert.type} text={alert.text} />}

    </div>
  );
}
