import { db } from "../db.js";

export const bookDetail = (req, res) => {
  const { id, productId, cost, sqlFormattedDate } = req.body;


  // Create a SQL query to insert the data into the booking table
  const sql = `
  INSERT INTO booking (user_id, pac_id, amount, start_date)
  VALUES (${id}, ${productId}, ${cost}, '${sqlFormattedDate}')
`;

  // Execute the query with the provided data
  db.query(sql, (err, result) => {
    // console.log("Database result:", result);
    if (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ error: "An error occurred", details: err.message });
    } else {
      console.log("Data inserted successfully");
      res.json({ message: "Payment successful" });
    }
  });
};
