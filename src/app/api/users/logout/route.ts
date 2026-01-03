import { NextResponse } from "next/server";

export async function GET(){
    try {
     const response=NextResponse.json({message:"LogOut Susccessfully",success:true});
     const options={httpOnly:true,expires:new Date(0)}; 

     response.cookies.set("token","",options);

     return response; 


    } catch (error:any) {
        NextResponse.json({error:error.message},{status:500})
    }
}