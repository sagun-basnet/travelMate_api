import { db } from "../db.js";

export const reviewDetail = (req, res) =>{
    const sqlGet = "SELECT * FROM review";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
}