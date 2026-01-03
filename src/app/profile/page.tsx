"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ProfilePage(){

    const router=useRouter();
    const [data,setData]=useState("nothing");

    const logout=async ()=>{
        try {
          await axios.get("/api/users/logout");
          toast.success("Logout successfully");
          router.push('/login');
        } catch (error:any) {
            console.log("Error in logout",error.message);
            toast.error(error.message);

        }
    }

    const getUserDetails=async()=>{
        const res=await axios.get("/api/users/mine");
        console.log(res.data);
         setData(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
             <h2 className="padding rounded bg-green-500 p-3">{data==='nothing' ? "Nothing" :<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button 
            onClick={logout}
            className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >Logout</button>
            <button 
            onClick={getUserDetails}
            className="bg-purple-300 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >Get User Details</button>
        </div>
    )

}