import user from "../modles/user.js";

export const getReadingHistory = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const User = await user.findById(id);
    if (!User) res.status(404).json({ message: "User not found" });
    console.log(User);

    // console.log(data);
    res.status(200).json({
      data: User.readingHistory,
    });
  } catch (error) {}
};

export const clearReadingHistory = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const User = await user.findById(id);
    if (!User) res.status(404).json({ message: "User not found" });
    User.readingHistory = [];
    // console.log(User);

    // console.log(data);
    User.save();
    res.status(200).json({
      message: "Reading history cleared",
    });
  } catch (error) {}
};

export const addReadingHistory = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;

    const { article } = req.body;
    console.log(article);

    const User = await user.findById(id);

    console.log(User);
    if (!User) return res.status(404).json({ message: "User not found" });

    User.readingHistory = User.readingHistory.filter(
      (rh) => rh.url !== article.url
    );

    User.readingHistory.unshift(article);

    if (User.readingHistory.length > 50) {
      User.readingHistory.pop();
    }
    await User.save();
    res.status(201).json({
      message: "reading history saved",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
