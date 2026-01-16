import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  preferences: [String],
  bookmarks: [{ Object }],
  readingHistory: [{ Object }],
});

const ReadingHistory = new mongoose.Schema({
  articleId: String,
  title: String,
  source: String,
  url: String,
  imageUrl: String,
  publishedAt: Date,
  readAt: { type: Date, default: Date.now },
});

const user = mongoose.model("user", UserSchema);

export default user;
