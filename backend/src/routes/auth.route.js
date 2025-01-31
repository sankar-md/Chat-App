import express from "express";
import {
  login,
  logout,
  signup,
  checkauth,
  updateProfile,
  updateProfileName,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.put("/update-name", protectRoute, updateProfileName);
router.get("/check", protectRoute, checkauth);

export default router;
