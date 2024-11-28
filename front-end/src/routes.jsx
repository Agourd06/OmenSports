import { createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import ProtectedRoute from "./middleWares/protectedRoutes";
import Dashboard from "./pages/organisateur/dashboard";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth/>
    },
    {
      path: "/admin",
      element: <ProtectedRoute element={<Dashboard/>} requiredRole='admin' />
    },
 

 
  ]);
  