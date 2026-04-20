import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "@page/auth/LoginPage.tsx";
import AuthLayout from "@/app/layouts/AuthLayout.tsx";
import LootLayout from "@/app/layouts/LootLayout.tsx";
import SidebarLayout from "@/app/layouts/SidebarLayout.tsx";
import WorldPage from "@page/world-list/ui/WorldPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LootLayout />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "/",
        element: <SidebarLayout />,
        children: [
          {
            path: "/worlds",
            element: <WorldPage />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
