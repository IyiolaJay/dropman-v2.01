import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
       await mongoose.connect(process.env.MONGODB_URI || "");
      console.log("Successfully connected to customer database",);
  } 
  
  catch (error: any) {
    console.log("Failed to connect to customer database", error);
    process.exit(1);
  }
};
