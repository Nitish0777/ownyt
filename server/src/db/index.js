import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    if (!connectionInstance) {
      throw new Error("Error connecting to MongoDb database");
    }
    console.log(
      "Database is connected to:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default connectDb;
