import { db } from "../db.js";

export const packageDetail = (req, res) =>{
    const sqlGet = "SELECT * FROM packages";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
}