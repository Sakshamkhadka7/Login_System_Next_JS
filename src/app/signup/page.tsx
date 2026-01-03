"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "@/components/Header";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log("SignUp success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-300">
        <Header/>

        <main>
          <section className="flex flex-col justify-center items-center mt-5 gap-4  h-50 w-[50%] mx-auto border-zinc-600 border-1 shadow-lg border-none">
            <h2 className="text-3xl font-medium text-indigo-950  ">
              This is a SignUp Page
            </h2>
            <p className="text-xl font-medium">
              You Can Sign Up here to register your email in Mailtrap <br />
              <span className="text-center flex items-center justify-center mt-2">
                Developed By{" "}
                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 font-bold animate-pulse">
                  Saksham
                </span>
              </span>
            </p>
          </section>
        </main>

        <div className="flex flex-col justify-center items-center py-2 min-h-screen border-1 h-80 w-[50%] mx-auto mt-8 border-zinc-800 border-none shadow-lg ">
          <h1 className="text-2xl font-bold text-green-950">{loading ? "Processing..." : "Sign Up"}</h1>
          <hr className="my-8 border-blue-700 border-t-2" />
          <label htmlFor="username" className="text-xl font-medium text-zinc-700 mb-2">Username:</label>
          <input
            className="p-2 focus:outline-none focus:border-gray-600 rounded-lg shadow-2xl mb-2"
            type="text"
            id="username"
            value={user.username}
            onChange={(e) =>
              setUser({
                ...user,
                username: e.target.value,
              })
            }
            placeholder="username"
          />

          <label htmlFor="email" className="text-xl font-medium text-zinc-700 mb-2">Email:</label>
          <input
            className="p-2 focus:outline-none focus:border-gray-600 rounded-lg shadow-2xl mb-2"
            type="email"
            id="email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            placeholder="email"
          />

          <label htmlFor="password" className="text-xl font-medium text-zinc-700 mb-2">Password:</label>
          <input
            className="p-2 focus:outline-none focus:border-gray-600 rounded-lg shadow-2xl mb-2"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            placeholder="password"
          />

          <button
            onClick={onSignUp}
            className="my-5 p-2 border border-gray-600 rounded-md focus:outline-none focus:border-amber-900 shadow-amber-700 bg-green-300 text-white"
          >
            {buttonDisabled ? "No SignUp" : "SignUP"}
          </button>

          <Link href="/login" className="shadow-amber-700 text-2xl ">Visit Login Page</Link>
        </div>
      </div>
    </>
  );
}

// Everything is server component and server component dont have access that has frontend side
