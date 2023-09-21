"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function ProtectedPage() {
  const { data: session } = useSession();
  if (!session) {
    return redirect("/login?callbackUrl=/protectedpage");
  }

  return (
    <div>
      <h1>Welcome, {session.user.user.name}!</h1>
      {/* Other content */}
    </div>
  );
}

export default ProtectedPage;
