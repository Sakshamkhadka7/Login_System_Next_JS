import {connect} from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest){
   
    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);

        const user=await User.findOne({email});
        if(!user){
            NextResponse.json({error:"User Doesnot Exists"},{status:500})
        }

        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            NextResponse.json({error:"Password Donot Match"},{status:500})
        }
        
        // create a token data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        // create a token 
        const token=await jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            {expiresIn:"1d"}
        );

        const options={
            httpOnly:true
        }

        const resposne=NextResponse.json({message:"Login Successfully",sucess:true});

        resposne.cookies.set("token",token,options);

        return resposne;

        
    } catch (error:any) {
        console.log("Error while logging",error);
        NextResponse.json({error:error.message},{status:500})
    }

}