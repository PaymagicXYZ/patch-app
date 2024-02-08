import UserDetail from "@/components/User";
import { Suspense } from "react";
import { NavSignIn } from "./NavSignIn";

export default function Nav() {
  return (
    <nav className="flex flex-row items-end p-2">
      <NavSignIn />
      <Suspense fallback={<div>Loading...</div>}>
        <UserDetail />
      </Suspense>
    </nav>
  );
}
