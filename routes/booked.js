import express from "express";
import {bookedDetail} from '../controllers/booked.js';

const router = express.Router();

router.get("/get", bookedDetail);


export default router;