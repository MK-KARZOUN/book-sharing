import Link from "next/link";
import React from "react";
import { IoBookSharp } from "react-icons/io5";
const NavBar = () => {
  const Links = [
    { label: "Sign in", href: "/signIn" },
    { label: "Sign up", href: "/signUp" },
  ];
  return (
    <nav className="flex justify-between items-center h-14 px-5 border-b mb-5">
      <Link href="/">
        <IoBookSharp />
      </Link>
      <ul className="flex gap-5">
        {Links.map((link) => (
          <Link
            key={link.href}
            className="text-zinc-500 hover:text-zinc-800 transtiton-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
