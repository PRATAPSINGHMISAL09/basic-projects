import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbconnection from "./db/dbconnection.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
dbconnection();
const app = express();
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});