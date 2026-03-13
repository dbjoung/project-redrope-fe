import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "@/app/auth/LoginPage.tsx";
import AuthLayout from "@/app/layouts/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
