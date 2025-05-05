import { createPost, getPost, deletePost , getAllPost , likeToggle } from "../controller/post.controller.js";
import verifyToken from "../middleware/verifyUser.middleware.js";
import express from "express"
import {upload} from "../middleware/multer.middleware.js"

const route = express.Router();

route.use(verifyToken)

// Route to create a post - Requires authentication
route.post("/create", upload.single('image'),createPost);

// Route to get post details by ID - Requires authentication
route.get("/:postId", getPost);

// Route to delete a post - Requires authentication
route.delete("/:postId", deletePost);

// Route to get post with pagination - Requires authentication
route.get("/", getAllPost);

// Route to toggle like of a post - Requires authentication
route.post("/like/:postId", likeToggle);

export { route };
