import express from "express";
import {userDetail} from '../controllers/user.js'

const router = express.Router();

router.get("/get", userDetail);


export default router;