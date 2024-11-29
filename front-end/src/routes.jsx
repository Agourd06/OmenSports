import { createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import ProtectedRoute from "./middleWares/protectedRoutes";
import Dashboard from "./pages/organisateur/dashboard";
import Participant from "./pages/organisateur/Participant";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth/>
    },
    {
      path: "/admin",
      element: <ProtectedRoute element={<Dashboard/>} requiredRole='admin' />
    },
    {
      path: "/participants",
      element: <ProtectedRoute element={<Participant/>} requiredRole='admin' />
    },
 

 
  ]);
  