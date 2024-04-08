import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config();

const app = express();

connectDb();












// import mongoose from "mongoose";
// import { DB_NAME } from "./constant.js";

// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// const app = express();
// (async () => {
//   try {
//     const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     console.log("Database is connected to:", db.connection.name);
//     app.on("error", (error) => {
//       console.error("Error starting server:", error);
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// })();
