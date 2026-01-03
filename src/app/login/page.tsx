"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import  axios  from "axios";
import { NextResponse,NextRequest } from "next/server";
import toast from "react-hot-toast";
import Header from "@/components/Header";


export default function LoginPage() {
  const router=useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled,setDisabledButton]=useState(false);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setDisabledButton(false);
    }else{
      setDisabledButton(true);
    }

  },[user]);

  const onLogin = async () => {
     
    try {

      setLoading(true);
      const response= await axios.post("/api/users/login",user);
      console.log(response.data);
      toast.success("Login Success");
      router.push("/profile");
      
    } catch (error:any) {
      console.log("Login failed in page",error.message);
      NextResponse.json({error:error.message},{status:500})  
     }finally{
      setLoading(false);
     }

  };

  const forgotPassword=async()=>{
    // const response=await axios.post("api/users/forgot-password",user);
    // console.log(response.data);
    router.push("/forgotpassword");
  }

  return (
   <>
     <Header/>
    <div className="flex flex-col justify-center items-center py-2 h-80 w-[40%] shadow-lg mx-auto mt-20">
   
      <h1 className="text-2xl">{loading ? "Processing...":"Login Here"}</h1>
      <hr className="my-6 border-blue-700 border-t-2" />

      <label htmlFor="email" className="text-xl">Email:</label>
      <input
        className="p-2 focus:outline-none focus:border-gray-600 rounded-lg shadow-2xl mt-6"
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

      <label htmlFor="password" className="mt-6 text-xl">Password:</label>
      <input
        className="p-2 focus:outline-none focus:border-gray-600 rounded-lg shadow-2xl mt-6"
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

     <div className="flex gap-2 my-5">
       <button
        onClick={onLogin}
        className=" p-2 border border-gray-600 rounded-md focus:outline-none focus:border-amber-900 shadow-amber-700 hover:bg-amber-100"
      >
        {buttonDisabled ? "No Login" :"Login"}
      </button>
      <button className="p-1 border border-gray-600 rounded-md focus:outline-none focus:border-amber-900 shadow-amber-700 hover:bg-amber-100"
      onClick={forgotPassword}
      >Reset Password</button>
     </div>

      <Link href="/signup">Visit SignUp Page</Link>
    </div>
   
   </>
  );
}

// Everything is server component and server component dont have access that has frontend side
