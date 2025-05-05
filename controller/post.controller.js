import { postService } from '../services/post.service.js';
import { cloudinaryUploader } from '../utils/cloudniary.js';  // Your existing uploader function


export const createPost = async (req, res) => {
    try {
        const {tags} = req.body
        const userId = req.userId 

        //upload files
        const postImagePath = req.file?.path
        if(!postImagePath){
            res.status(400).json({message:"image file is required"})
        }
        
        const file = await cloudinaryUploader(postImagePath)
        
        // get string
        const fileString = file.url
        
        if(!fileString){
            res.status(400).json({message:"error occure while uploading"})
        }
        
        
        // upload post
        const post = await postService.createPost({userId , content : fileString , tags})

        //res
        res.status(200).json({ message : "post is created" , post})

    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getPost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        const post = await postService.getPostById(postId);

        if (post instanceof Error) {
            return res.status(404).json({ message: post.message });
        }

        return res.status(200).json({ message: "Post fetched", post });
    } catch (error) {

        console.error("Get Post Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;  // Assuming userId is set in the middleware

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        // Call the service function to delete the post
        const result = await postService.deletePostService(postId, userId);

        return res.status(200).json(result);
    } catch (error) {
        console.error("Delete Post Error:", error.message);
        return res.status(500).json({ message: "Failed to delete post", error: error.message });
    }
};

export const getAllPost = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 3;

        let offset = (page-1)*limit

        const { post , count } = await postService.getAllPost(offset , limit)

        res.status(200).json({message : "fetch with sucess" , count ,post })
    } catch (error) {
        console.log("error getALLPost", error.message)
        res.status(500).json({message : error.message})
    }
}

export const likeToggle = async (req,res) => {
   try {
     const {postId} = req.params
     const userId = req.userId

     console.log(postId)
 
     if (!postId) {
         return res.status(400).json({ message: "Post ID is required" });
     }
 
     const result = await postService.likeToggle(userId , postId);
 
     return res.status(200).json({message : "like is toggled" , newCount : result});
   } catch (error) {
        console.log("error likeToggle", error.message)
        res.status(500).json({message : error.message})
   }
}