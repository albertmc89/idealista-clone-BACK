import mongoose from "mongoose";

const connectToDataBase = async (mongoDbUrl: string) => {
  await mongoose.connect(mongoDbUrl);
};

export default connectToDataBase;
