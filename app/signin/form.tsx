"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface FormData {
  email: string;
  password: string;
}

const SignInForm = () => {

  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);

      signIn('credentials',{
        email : formData.get("email"),
        password:formData.get("password"),
        redirect: false
      }).then((res)=>{
          console.log(res)
      }).catch((reason)=>{
        console.log(reason)
      })
    
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
