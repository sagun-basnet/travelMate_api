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


app.listen(5000, () =>{
    console.log("Connected to the port 5000.");
})