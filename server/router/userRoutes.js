import express from "express";
import {
  login,
  Register,
  verify,
  googleLogin,
} from "../controllers/authControllers.js";
// import bcrypt from "bcrypt.js";

import verifyToken from "../middleware/verifyToken.js";

const userRoutes = express.Router();

userRoutes.post("/Register", Register);
userRoutes.post("/Login", login);
userRoutes.get("/verify", verifyToken, verify);
userRoutes.post("/google", googleLogin);

export default userRoutes;
