import express from "express";
import {reviewDetail} from '../controllers/review.js'

const router = express.Router();

router.get("/get", reviewDetail);


export default router;