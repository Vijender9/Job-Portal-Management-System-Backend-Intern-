
import { check } from "express-validator";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const registerUser= asyncHandler(async(req,res)=>{
    const{name,email,password,role}=req.body;
      if( !email || !password){
        throw new ApiError(404,"Email or Password Required");
      }
      const alreadyExist=await User.findOne({email});
      if(alreadyExist){
        throw new ApiError(404,"User Already Exist");
      }
      
      const hashedPassword= await bcrypt.hash(password,10);
      const newUser= await User.create({
          name,
          email,
          password:hashedPassword,
          role:role||'User'
      })

      res.status(200).json(new ApiResponse(200,newUser,"User registered Successfully"))

})

  const loginUser= asyncHandler(async(req,res)=>{
    console.log("inside login user")
    const {email,password}=req.body;
      if(!email || !password){
        throw new ApiError(404,"Email or password is required")
      }
       const user= await User.findOne({email});
       if(!user){
        throw new ApiError(404,"Email does not Exist");
       }

       const matchPassword= await bcrypt.compare(password,user.password);
       if(!matchPassword){
        throw new ApiError(404,"Password does not match")
       };

       const token= jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN ||"7d"
       })

      const  response= await User.findById({_id:user._id}).select("-password")
      res.status(200).json(new ApiResponse(200,{user:response,token},"Login successfully"))
           
  }) 

  export {registerUser,loginUser}