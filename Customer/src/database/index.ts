import mongoose from "mongoose";
import config  from "../config/default";

const uri = config.databaseUri;

export const connectToDatabase = async () => {
  try {
       await mongoose.connect(uri as string);
      console.log("Successfully connected to customer database",);
  } 
  
  catch (error: any) {
    console.log("Failed to connect to customer database", error);
    process.exit(1);
  }
};
