import express from "express";
import cors from "cors";
import packageRoutes from "./routes/package.js"
import allRoutes from "./routes/bokPacUsr.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import reviewRoutes from "./routes/review.js"
import bookingRoutes from "./routes/booking.js"
import guideRoutes from "./routes/guide.js"
import bookedRoutes from "./routes/booked.js"
import cookieParser from "cookie-parser";
import { db } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/package", packageRoutes);
app.use("/api/allDetail", allRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/guide", guideRoutes)
app.use("/api/book", bookingRoutes)
app.use("/api/allReview", reviewRoutes)
app.use("/api/bookedDetail", bookedRoutes)

app.put('/api/packages/:id', (req, res) => {
    const packageId = req.params.id;
    const { status } = req.body;
  
    const subquery = `SELECT booked_id FROM packages WHERE id = ${packageId}`;
    
    db.query(subquery, (err, result) => {
        if (err) {
            console.error('Error executing subquery:', err);
            return res.status(500).json({ error: 'Error executing subquery' });
        }
        const bookedId = result[0].booked_id;
        console.log('Subquery:', bookedId);
  
      const sql1 = `UPDATE packages SET status = ${status}, booked_id = ${status} WHERE id = ${packageId}`;
      const sql2 = `DELETE FROM booking WHERE id = ${bookedId}`;
  
      db.query(sql1, (err, result) => {
        if (err) {
          console.error('Error updating package status:', err);
          return res.status(500).json({ error: 'Error updating package status' });
        }
        db.query(sql2, (err, result) => {
          if (err) {
            console.error('Error deleting booking:', err);
            return res.status(500).json({ error: 'Error deleting booking' });
          }
          return res.status(200).json({ message: 'Package status updated successfully' });
        });
      });
    });
  });

  //for complete booking
app.put('/api/booking/complete/:bookingId', (req, res) => {
    const bookingId = req.params.bookingId;
  
    // Retrieve the data from the `booking` table
    const selectQuery = 'SELECT * FROM booking WHERE id = ?';
    db.query(selectQuery, [bookingId], (error, results) => {
      if (error) {
        console.error('Error retrieving booking data:', error);
        return res.status(500).json({ message: 'An error occurred' });
      }
  
      if (results.length === 0) {
        // If the booking data does not exist, return an error response
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      const bookingData = results[0];
      // console.log(bookingData);
  
      // Insert the data into the `booked` table
      const insertQuery = 'INSERT INTO booked (user_id, pac_id, amount, start_date) VALUES (?,?,?,?)';
      db.query(insertQuery, [bookingData.user_id, bookingData.pac_id, bookingData.amount, bookingData.start_date], (error) => {
        if (error) {
          console.error('Error inserting data into booked table:', error);
          return res.status(500).json({ message: 'An error occurred' });
        }
  
        // Delete the data from the `booking` table
        const deleteQuery = 'DELETE FROM booking WHERE id = ?';
        db.query(deleteQuery, [bookingId], (error) => {
          if (error) {
            console.error('Error deleting data from booking table:', error);
            return res.status(500).json({ message: 'An error occurred' });
          }
  
          res.sendStatus(200);
        });
      });
    });
  });

app.listen(5000, () =>{
    console.log("Connected to the port 5000.");
})