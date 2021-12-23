import mongoose from "mongoose";

export default function connectDB() {
  if (mongoose.connections[0].readyState) {
    console.log("Database is already connected");
  }
  mongoose.connect(process.env.DATABASE_URL, {}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  });
}
