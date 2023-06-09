import express from "express";
import cors from "cors";
import packageRoutes from "./routes/package.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/package", packageRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.listen(5000, () =>{
    console.log("Connected to the port 5000.");
})