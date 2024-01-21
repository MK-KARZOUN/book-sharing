"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";

const AuthButton = () => {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div>
        {session?.user?.name}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <Link href="../signin">Sign in</Link>
      <Link href="../signup">Sign up</Link>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-14 px-5 border-b mb-5">
      <Link href="/">
        <IoBookSharp />
      </Link>
      <AuthButton />
    </nav>
  );
};

export default NavBar;
