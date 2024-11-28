import mongoose from "mongoose";
import appData from "../../entities/applicationConfig";


const connectDB = async (): Promise<void> => {
  try {

    await mongoose.connect(appData.DATABASE_URL as string);
    mongoose.set("strictQuery", true);
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
    process.exit(1);
  }
};
export default connectDB;
