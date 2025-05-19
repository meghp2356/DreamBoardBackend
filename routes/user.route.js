import express from "express";
import { updateProfileUser, follow } from "../controller/user.controller.js";
import {upload} from "../middleware/multer.middleware.js"
import verifyToken from "../middleware/verifyUser.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes below
router.use(verifyToken);

// Update profile picture
router.put("/profile/pic",upload.single('image'), updateProfileUser);

// Follow / Unfollow toggle
router.post("/follow/:follow", follow);