import { db } from "../db.js";

export const guideDetail = (req, res) =>{
    const sqlGet = "SELECT * FROM user where role='guide'";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
}