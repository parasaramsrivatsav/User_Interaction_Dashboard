const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/analyticsdb";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Analytics API is running" });
});

app.use("/api", require("./routes/eventRoutes"));

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});