import { createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import ProtectedRoute from "./middleWares/protectedRoutes";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth/>
    },
    {
      path: "/admin",
      element: <ProtectedRoute element={<Auth/>} requiredRole='admin' />
    },
 

 
  ]);
  