import user from "../modles/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(404).json({
        message: "User is not  registered , Please register and try  again",
      });
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "password do not match",
      });
    }

    const token = jwt.sign(
      { id: User._id, name: User.name, email: User.email },
      process.env.JWT_SECRET || "hello_this_string",
      { expiresIn: "1d" }
    );
    console.log(User);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    res.status(200).json({
      preferences: User.preferences,
      message: "login SuccessFull",
    });
  } catch (error) {}
};

export const verify = async (req, res) => {
  try {
    console.log("verify Wali", req.user);
    if (!req.user) {
      return res.status(401).json({
        authenticated: false,
        message: "No token Found",
      });
    } else {
      return res.status(200).json({
        authenticated: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
      });
    }
  } catch (error) {
    return res.status(500).json({
      authenticated: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const Register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const User = await user.findOne({ email });
    console.log(User);
    if (User) {
      return res.status(404).json({
        message: "User is already register ,Please Login",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = await user.create({
      name,
      password: hashedpassword,
      email,
    });

    res.status(201).json({
      data: newUser,
      message: "successfully Registered",
    });
  } catch {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    console.log(idToken);
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodedToken);
    let User = await user.findOne({ email: decodedToken.email });

    if (!User) {
      User = new user({
        name: decodedToken.name,
        email: decodedToken.email,
        password: "google-auth",
      });

      await User.save();
    }

    const token = jwt.sign(
      { id: User._id, name: User.name, email: User.email },
      process.env.JWT_SECRET || "hello_this_string",
      { expiresIn: "15d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    });
    res.status(200).json({
      preferences: User.preferences,
      message: "login SuccessFull",
    });
  } catch (error) {
    console.log(error);
  }
};
