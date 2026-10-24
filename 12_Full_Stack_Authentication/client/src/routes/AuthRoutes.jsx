import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

const AuthRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },

        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },

    {
      path: "/main",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AuthRoutes;
