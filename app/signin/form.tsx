"use client";
import { signIn } from "next-auth/react";

interface FormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
