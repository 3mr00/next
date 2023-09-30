"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.user.level}</p>
        <span
          // href={"/api/auth/signout"}
          onClick={() => signOut()}
          className="flex gap-4 ml-auto text-red-600"
        >
          Sign Out
        </span>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto items-center">
      <span
        // href={"/login"}
        onClick={() => signIn()}
        className="flex gap-4 ml-auto text-green-600"
      >
        Sign In
      </span>
      {/* <span
        // href={"/signup"}
        onClick={() => signIn()}
        className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded"
      >
        Sign Up
      </span> */}
    </div>
  );
};

export default SignInButton;
