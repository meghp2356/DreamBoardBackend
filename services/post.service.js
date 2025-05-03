import { Post } from "../models/post.model.js";
import mongoose from "mongoose";

class PostService{
    async createPost({
        tags = "",
        content ,
        userId ,
    }){
        try {
            const post = await Post.create({ userId : new mongoose.Types.ObjectId(userId) , content , tags}) 

            if(!post){
                throw new Error("something went wrong while creating post")
            }

            return post
        } catch (error) {
            throw error
        }
    }

    async getPostById(postId){
        try {
            const post = await Post.aggregate([
                {
                    $match : {
                        _id :new  mongoose.Types.ObjectId(postId)
                    }
                },
                {
                    $lookup : {
                        from : "users",
                        localField : "userId",
                        foreignField : "_id",
                        as : "userData"
                    }
                },
                {
                    $unwind : {
                        path : "$userData",
                        preserveNullAndEmptyArrays : true
                    } 
                },
                {
                    $project : {
                        content : 1,
                        tags : 1,
                        likeCount : 1,
                        userData : {
                            username : 1,
                            email : 1,
                            following : 1,
                            profilePic : 1
                        }
                    }
                }

            ]);

            if (!post || post.length === 0) {
                throw new Error("Post not found");
            }

            return post[0]; // since we matched on _id
        } catch (error) {
            throw error;
        }
    }

    async deletePostService(postId, userId) {
        try {
            // Find the post by its ID and make sure the user is the one who created it
            const post = await Post.findById(postId);
    
            if (!post) {
                throw new Error("Post not found");
            }
    
            if (post.userId.toString() !== userId) {
                throw new Error("You can only delete your own posts");
            }
    
            // Delete the post from the database
            await Post.findByIdAndDelete(postId);
    
    
            return { message: "Post deleted successfully" };
        } catch (error) {
            throw error;
        }
    };

    async getAllPost(offset , limit){
        try {
            const post = await Post.aggregate([
                {
                    $skip : offset
                },
                {
                    $limit : Number(limit)
                },
                {
                    $project : {
                        content : 1,
                        tags : 1,
                        likeCount : 1,
                    }
                }
            ])

            const count = post.length

            return {post , count}
        } catch (error) {
            throw error
        }
    }
}


export const postService = new PostService()