import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./database/index.js";
import cors from "cors"
import cookieParser from "cookie-parser";


dotenv.config();
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());

import {router as userRouter} from "./routes/userRoutes.js";
import {router as jobRouter} from "./routes/jobRoutes.js";

app.use("/api/user",userRouter)
app.use("/api/job",jobRouter)

connectDB()
.then(()=>{
    //for error listen
    app.listen(process.env.PORT || 1000,()=>{
        console.log(`Server is running at port:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed !!",err)
})