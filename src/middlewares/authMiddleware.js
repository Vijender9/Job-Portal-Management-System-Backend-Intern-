import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const authMiddleware= asyncHandler(async(req,res,next)=>{
       console.log("im inside auth")
    const authHeader= req.headers.authorization;
    console.log("authHeader is :",authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new ApiError(404,"Unauthorized no token isprovide from frontend")
    }
    const token= authHeader.split(" ")[1];
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    console.log("decoded.userId",decoded._id)
    const user= await User.findById(decoded._id).select("-password");
    if(!user){
        throw new ApiError(404,"User not found");
    }
    req.user=user;
    next();

})

const isAdmin=asyncHandler(async(req,res,next)=>{
       console.log("im inside admin")
    if(req.user && req.user.role==='admin')next();
    else{
        throw new ApiError(404,"Admin only")
    }

})
export { authMiddleware,isAdmin}