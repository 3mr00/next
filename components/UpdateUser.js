"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const UpdateUser = () => {
  const [NewName, setNewName] = useState("");
  const { data: session, update } = useSession();

  return (
    <div>
      <h1>Welcome, {session?.user.user.level}!</h1>

      <input
        type="text"
        value={NewName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={() => update({ name: NewName })}>ارزع</button>
    </div>
  );
};

export default UpdateUser;
