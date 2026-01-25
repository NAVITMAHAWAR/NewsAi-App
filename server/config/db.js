import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://Navit123:Navit123@cluster0.c91e4hu.mongodb.net/news_point"
    );
    console.log("Mongodb Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
