"use client";
import { useSession } from "next-auth/react";

function ProtectedPage() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
    return <div>You must be logged in to access this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.user.name}!</h1>
      {/* Other content */}
    </div>
  );
}

export default ProtectedPage;
