import { db } from "../db.js";

export const userDetail = (req, res) =>{
    const sqlGet = "SELECT * FROM user where role='user'";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
}