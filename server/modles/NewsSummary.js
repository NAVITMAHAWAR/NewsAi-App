import mongoose from "mongoose";
import { newsSummarize } from "../controllers/aiControllers.js";

const NewsSummarySchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const NewsSummary = mongoose.model("NewsSummary", NewsSummarySchema);
export default NewsSummary;
