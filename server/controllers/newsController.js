import user from "../modles/user.js";
import axios from "axios";
import News from "../modles/News.js";

export const Preferences = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;
    // console.log(preferences);
    const User = await user.findById(id);
    console.log(User);

    User.preferences = [...preferences];
    // console.log([...preferences]);
    await User.save();
    res.status(200).json({
      message: "preferences Save SuccessFully",
    });
  } catch (error) {}
};

export const fetchNewsByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 0 } = req.query;
  console.log(page);
  const pageSize = 10;
  try {
    // const { page = 1, pageSize = 10 } = req.query;
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&category=${category}&country=us&apiKey=${process.env.NEWS_API_KEY}`
    );
    console.log(res.data);

    if (response.data)
      return res.status(200).json({
        length: response.data.articles.length,
        news: response.data.articles,
        nextPage:
          response.data.articles.length === pageSize ? Number(page) + 1 : null,
      });
  } catch (error) {}
};

export const fetchAllNews = async (req, res) => {
  console.log(req.query);
  const { limit = 20, page = 1, keyword } = req.query;
  const query = keyword
    ? {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { content: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { author: { $regex: keyword, $options: "i" } },
          { url: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};
  try {
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);
    if (!news) {
      return res.status(400).json({
        message: "No news found",
      });
    }

    const totalCount = await News.countDocuments(query);

    res.status(200).json({
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      length: news.length,
      data: news,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
