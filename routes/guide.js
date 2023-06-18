import express from "express";
import {guideDetail} from '../controllers/guide.js'

const router = express.Router();

router.get("/get", guideDetail);


export default router;