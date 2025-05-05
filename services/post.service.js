import { Post } from "../models/post.model.js";
import {Like} from "../models/like.model.js"
import mongoose from "mongoose";

class PostService{
    async createPost({
        tags = "",
        content ,
        userId ,
    }){
        try {
            const post = await Post.create({ userId :  new mongoose.Types.ObjectId(userId) , content , tags}) 

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

    async likeToggle(userId , postId){
        try {

            if (!mongoose.Types.ObjectId.isValid(postId)) {
                throw new Error("Invalid postId");
            }
            
            const like = await Like.findOne({
                userId,
                postId
            }).lean()

            if(!like){
                await Like.create({
                    postId : new mongoose.Types.ObjectId(postId),
                    userId : new mongoose.Types.ObjectId(userId)
                })


                const post  = await Post.findOneAndUpdate({ _id : postId},{
                    $inc : {
                        likeCount : 1
                    }
                },{new : true})  

        
                return post.likeCount
            }else{
                await Like.deleteOne({_id : like._id})

                const post = await Post.findOneAndUpdate({ _id :  new mongoose.Types.ObjectId(postId)},{
                    $inc : {
                        likeCount : -1
                    }
                },{new : true}) 

                return post.likeCount
            }


        } catch (error) {
            throw error
        }
    }
}


export const postService = new PostService()