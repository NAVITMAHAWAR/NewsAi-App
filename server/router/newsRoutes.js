import express from "express";
import {
  Preferences,
  fetchNewsByCategory,
} from "../controllers/newsController.js";
import { fetchAllNews } from "../controllers/newsController.js";

const newsRoutes = express.Router();

newsRoutes.post("/preferences/:id", Preferences);
newsRoutes.get("/news/:category", fetchNewsByCategory);
newsRoutes.get("/news", fetchAllNews);

export default newsRoutes;
