import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createJob= asyncHandler(async(req,res)=>{
    console.log("im inside createojob")
    const {title,description,company,location,
        category,
     }=req.body;
     const createJob= await Job.create({
        title,
        description,
        company,
        location,
        category,
     })
     console.log("create JOb done")
     res.status(201).json(new ApiResponse(201,createJob,"Job is created Successfully"))
})

const getAllJob= asyncHandler(async(req,res)=>{
      const search=req.query.search || '';
      const keyword= {
        $or:[
            {
                title:{
                    $regex:search,$options:'i'
                }
            },
            {
                company:{
                    $regex:search,Options:'i'
                }
            }
        ]

      };
      const jobs= await Job.find(keyword).sort({createdAt:-1});
      res.status(200).json(new ApiResponse(200,jobs,"Jobs fecthed according to search"))

    
})


const applyToJob =asyncHandler(async(req,res)=>{
    console.log("inside apply joob")
    const jobId= req.params.id;
    const userId=req.user.id;

    const job= await Job.findById(jobId);
    if(!job){
        throw new ApiError(404,"Job not found");
    }
    const alreadyApplied= job.applicants.find(
        (app)=>{
            app.userId.toString()===userId
        }

    )
    if(alreadyApplied){
       return res.status(400).json(new ApiResponse(400,alreadyApplied,"You Already applied to this job"))
    }

    job.applicants.push({userId});
    await job.save();

    res.status(200).json(new ApiResponse(200,job,"Applied Successfully"))

})

 const getUserApplication= asyncHandler(async(req,res)=>{// I guess my all apllication i have aopplied
     const userId= req.user.id;

     const jobs= await Job.find({'applicants.userId':userId});
     res.status(200).josn(new ApiResponse(200,jobs,"All applied applications fetched successfully"))
 })
const unapplyFromJob= asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const jobId=req.params.id;

    const job= await Job.findById(jobId);
    if(!job){
        throw new ApiError(404,"Job not found");
    }
    job.applicants=job.applicants.filter((app)=>
    app.userId.toString()!==userId);
    await job.save();

    res.status(200).json(new ApiResponse(200,job,"Application removed!"))
})
export {createJob,getAllJob,applyToJob,getUserApplication,unapplyFromJob}