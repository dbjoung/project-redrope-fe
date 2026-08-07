import AuthProvider from "@/share/model/AuthProvider";

import { Outlet } from "react-router";

export default function RootLayout() {
  return <AuthProvider>{<Outlet />}</AuthProvider>;
}
