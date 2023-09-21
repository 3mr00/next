"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";

function dashboard() {
  const [NewName, setNewName] = useState("");
  const { data: session, update } = useSession();

  if (session?.user.user.isAdmin !== true) {
    return redirect("/login?callbackUrl=/dashboard");

    // return <div>You must be logged in to access this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.user.level}!</h1>
      <input
        type="text"
        value={NewName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={() => update({ name: NewName })}>ارزع</button>
      {/* Other content */}
    </div>
  );
}

export default dashboard;
