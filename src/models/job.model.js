import { compare } from "bcryptjs";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    category:{
        type:String
    },
    applicants:[
        {
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     appliedAt:{
        type:Date,
        default:Date.now
     }


}]
},{timestamps:true}
)

export const Job =new mongoose.model("Job",jobSchema)