import mongoose from "mongoose";

const connectToDB = async (MONGO_URI: string) => {
  const conn = await mongoose.connect(MONGO_URI);
  console.log(`MongoDB Database Connected to ${conn.connection.host}`);
};

export default connectToDB;
