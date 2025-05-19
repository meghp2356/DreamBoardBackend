import express from "express";
import {
    getFollowers,
    getFollowing,
    checkIsFollowing
} from "../controllers/follow.controller.js";
import verifyToken from "../middleware/verifyUser.middleware.js";

const router = express.Router();

router.use(verifyToken)

// ✅ GET all followers of a user
// Example: GET /api/follow/followers/USER_ID?page=1&limit=10
router.get("/followers/", getFollowers);

// ✅ GET all following of a user
// Example: GET /api/follow/following/USER_ID?page=1&limit=10
router.get("/following/", getFollowing);

// ✅ Check if one user is following another
// Example: GET /api/follow/is-following/USER_ID/FOLLOW_ID
router.get("/is-following/:followId", checkIsFollowing);

export default router;
