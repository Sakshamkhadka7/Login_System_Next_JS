import mongoose from "mongoose";

export async function connect(){
    try {
          mongoose.connect(process.env.MONGO_URI!);
          const connection=mongoose.connection;

          connection.on('connected',()=>{
            console.log("Connected SuccessFully");
          });

          connection.on('error',(err)=>{
            console.log("MongoDb connection Error . Please Make sure MongoDb is running",err);
            process.exit();
          })    
    } catch (error) {
        console.log("Something Goes Wrong");
        console.log(error);
    }
}