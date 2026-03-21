import { Navigate, Outlet } from "react-router";
import { useSession } from "@/store/session.ts";

export default function MemberOnlyLayout() {
  const session = useSession();

  if (!session) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  return <Outlet />;
}