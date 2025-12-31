import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "@/app/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
