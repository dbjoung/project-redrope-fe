import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "@/app/layouts/AuthLayout.tsx";
import LootLayout from "@/app/layouts/LootLayout.tsx";
import OutWorldLayout from "@/app/layouts/OutWorldLayout";
import { RouteErrorBoundary } from "@/share/lib/RouteErrorBoundary";
import WorldList from "@/page/out-world/ui/WorldList";
import Login from "@/page/auth/Login";
import InWorld from "@/page/in-world/ui/InWorld";
import InWorldLayout from "./layouts/InWorldLayout";
import EntityDetail from "@/page/in-world/ui/EntityDetail";
import Join from "@/page/auth/Join";
import FindPassword from "@/page/auth/FindPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/join",
            element: <Join />,
          },
          {
            path: "/find-password",
            element: <FindPassword />,
          },
        ],
      },
      {
        path: "/",
        element: <OutWorldLayout />,
        children: [
          {
            path: "/worlds",
            element: <WorldList />,
          },
        ],
      },
      {
        path: "/worlds/:worldId",
        element: <InWorldLayout />,
        children: [
          {
            path: "/worlds/:worldId/:categoryId",
            element: <InWorld />,
          },
          {
            path: "/worlds/:worldId/:categoryId/:entityId",
            element: <EntityDetail />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
