import express from "express";
import {packageDetail} from '../controllers/package.js'

const router = express.Router();

router.get("/get", packageDetail);


export default router;