import express from "express";
import {bookDetail} from '../controllers/booking.js'

const router = express.Router();

router.post("/", bookDetail);


export default router;