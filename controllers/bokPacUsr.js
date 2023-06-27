import { db } from "../db.js";

export const allDetail = (req, res) =>{
    const sqlGet = "SELECT u.id AS user_id, u.name AS user_name, u.email, p.id AS package_id, p.pac_name, p.pac_description, p.cost, p.time, p.status, b.id AS book_id, b.amount FROM booking b INNER JOIN user u ON b.user_id = u.id INNER JOIN packages p ON b.pac_id = p.id;";
    db.query(sqlGet, (err, result) =>{
        if(err) return res.json(err);
        return res.status(200).json(result);
    })
}