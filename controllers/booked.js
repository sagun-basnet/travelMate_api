import { db } from "../db.js";

export const bookedDetail = (req, res) =>{
    const sqlGet = "SELECT * FROM booked";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
}