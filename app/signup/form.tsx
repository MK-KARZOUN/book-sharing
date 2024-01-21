"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  username: string;
}

const SignUpForm = () => {


  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataForm  = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         email: dataForm.get("email"),
         password: dataForm.get("password"),
         username: dataForm.get("username"),
        }),
      });

      if (response.ok) {
        router.push("/signin");
      } else {
        console.error("Sign-up failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        name="username"
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
