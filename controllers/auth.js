import {db} from "../db.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) =>{
    //check existing user
    const q = "SELECT * from user WHERE email = ?"
    db.query(q,[req.body.email], (err,data)=>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user(`name`, `email`,`password`,`phone`,`role`) VALUES(?,'user')";
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.phone,
        ]

        db.query(q,[values], (err,data) =>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created");
        })
    })
    
}
export const guideRegister = (req, res) =>{
    //check existing user
    const q = "SELECT * from user WHERE email = ?"
    db.query(q,[req.body.email], (err,data)=>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user(`name`, `email`,`password`,`phone`,`role`) VALUES(?,'guide')";
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.phone,
        ]

        db.query(q,[values], (err,data) =>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created");
        })
    })
    
}
export const addPackage = (req, res) =>{

        const q = "INSERT INTO packages(`pac_name`, `pac_description`,`cost`,`time`,`mainImg`,`img2`, `img3`) VALUES(?)";
        const values = [
            req.body.pac_title,
            req.body.pac_description,
            req.body.pac_cost,
            req.body.pac_time,
            req.body.mainImg,
            req.body.img2,
            req.body.img3,
        ]

        db.query(q,[values], (err,data) =>{
            if (err) {
                console.error("Error aayo:", err);
                res.status(500).json({ error: "An error occurred", details: err.message });
            } else {
              console.log("Package has been created");
              res.json({ message: "Payment successful" });
            }
        })
    
}
export const login = (req, res) =>{
    //check user exist or not...

    const q = "select * from user where email = ?";
    
    //excute query...
    db.query(q,[req.body.email], (err,data) =>{
        if(err) return res.json(err);

        //if there is no user..
        if(data.length === 0) return res.status(404).json("User not found!");

        //if user exist..
        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        //if not correct..
        if(!isPasswordCorrect) return res.status(400).json("Wrong email or password");

        const token = jwt.sign({id:data[0].id}, "jwtkey");

        //getting password and other user information sepratly
        const {password, ...other} = data[0];

        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json(other);
    })
}
export const logout = (req, res) =>{
    res.clearCookie("access_token",{
        sameSite: "none",
        secure:true
    }).status(200).json("User has been logged out")
}