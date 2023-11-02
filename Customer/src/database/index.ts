import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  try {
       await mongoose.connect(uri || "");
      console.log("Successfully connected to customer database",);
  } 
  
  catch (error: any) {
    console.log("Failed to connect to customer database", error);
    process.exit(1);
  }
};
