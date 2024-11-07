import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import youtubeRouter from "./routes/youtube.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/youtube", youtubeRouter);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
