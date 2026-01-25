import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import userRoutes from "./router/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import newsRoutes from "./router/newsRoutes.js";
import bookmarksRoutes from "./router/bookmarksRoutes.js";
import readingHistoryRoutes from "./router/readingHistoryRoutes.js";
import aiRoutes from "./router/aiRoutes.js";
import axios from "axios";
import News from "./modles/News.js";
import cron from "node-cron";
import admin from "firebase-admin";

dotenv.config();

const app = express();

app.use(
  session({
    secret: "hello_this_string",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

app.use(cookieParser());

app.use(express.json());

dbConnect();

// Load Firebase credentials from environment variable
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Fallback for local development
  try {
    const { default: firebaseConfig } = await import("./key/firebase.json", {
      assert: { type: "json" },
    });
    serviceAccount = firebaseConfig;
  } catch (error) {
    console.error(
      "Firebase credentials not found. Set FIREBASE_SERVICE_ACCOUNT environment variable.",
    );
    process.exit(1);
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// console.log(process.env.FIREBASE_SERVICE_ACCOUNT);

const countries = ["us", "uk", "fr", "in", "it"];
const categories = [
  "health",
  "science",
  "sport",
  "entertainment",
  "politics",
  "business",
];

const fetchNewsAndStore = async () => {
  for (let country of countries) {
    for (let category of categories) {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`,
      );
      if (data.articles && data.articles.length > 0) {
        // console.log(data.articles);
        data.articles.map(async (d) => {
          const exist = await News.findOne({ title: d.title });
          // console.log(exist);
          if (!exist) {
            const newData = await News.create({
              content: d.content,
              title: d.title,
              author: d.author,
              description: d.description,
              url: d.url,
              urlToImage: d.urlToImage,
              category: d.category,
              publishedAt: d.publishedAt,
              country: d.country,
              source: {
                id: d.source.id,
                name: d.source.name,
              },
            });
            console.log(`Inserted ${d.title} [${category}-${country}]`);
          } else {
            console.log(`Already exist ${d.title}`);
          }
        });
      } else {
        console.log("no data found");
      }
    }
  }
};
fetchNewsAndStore();

cron.schedule("*/15 * * * *", fetchNewsAndStore);

// console.log(process.env.PORT);
app.use("/auth", userRoutes);
app.use("/api", newsRoutes);
app.use("/api", bookmarksRoutes);
app.use("/api", readingHistoryRoutes);
app.use("/api", aiRoutes);
app.listen(process.env.PORT || 8001, () => {
  console.log(`server is Running on the port ${process.env.PORT}`);
});
