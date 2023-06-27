import express from "express";
import { allDetail } from '../controllers/bokPacUsr.js'

const router = express.Router();

router.get("/get", allDetail);


export default router;