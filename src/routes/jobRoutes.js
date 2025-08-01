import express from "express"

const router= express.Router();
import { createJob,getAllJob,getUserApplication,applyToJob,unapplyFromJob } from "../controllers/jobController.js";
import {authMiddleware,isAdmin} from "../middlewares/authMiddleware.js";

router.post("/",authMiddleware,isAdmin, createJob);
router.get("/",getAllJob);
router.get("/applied",authMiddleware,getUserApplication)
router.post("/:id/apply",authMiddleware,applyToJob);
router.delete("/:id/unapply",authMiddleware,unapplyFromJob);

export {router}