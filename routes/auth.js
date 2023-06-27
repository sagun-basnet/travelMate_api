import express from "express";
import {register, guideRegister, login, logout, addPackage, addReview} from '../controllers/auth.js'


const router = express.Router();

router.post("/register", register)
router.post("/guideRegister", guideRegister)
router.post("/addPackage", addPackage)
router.post("/addReview", addReview)
router.post("/login", login)
router.post("/logout", logout)

export default router;