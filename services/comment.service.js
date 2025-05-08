import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";

class CommentService{
    async getCommet(postId){
            try {
               const allComment = await Comment.aggregate([
                    {
                        $match : {
                            post : new mongoose.Types.ObjectId(postId),
                            parent : null
                        }
                    },
                    {
                        $lookup : {
                            from : "users",
                            localField : "user",
                            foreignField : "_id",
                            as : "userData"
                        }
                    },
                    {
                        $unwind : "$userData"
                    },
                    {
                        $project : {
                            comment : 1,
                            createdAt : 1,
                            _id : 1,
                            userData : {
                                username : 1,
                                profilePic : 1
                            }
                        }
                    }
                ])

                if(!allComment){
                    throw new Error("no comment")
                }

                return allComment

            } catch (error) {
                throw error
            }
    }

    async postCommentOnPost({postId , userId , comment}){
        try {
            const createComment = await Comment.create({
                post : new mongoose.Types.ObjectId(postId),
                user : new mongoose.Types.ObjectId(userId),
                comment 
            })

            if(!createComment){
                throw new Error("failed at creating comment ")
            }

            return createComment
        } catch (error) {
            throw error
        }
    }   

    async postCommentOnComment({ postId, userId, comment, parentCommentId }) {
        try {
          // Optional: You can check if the parent comment exists
          if (parentCommentId) {
            const parentExists = await Comment.findById(parentCommentId);
            if (!parentExists) {
              throw new Error("Parent comment not found");
            }
          }
    
          const created = await Comment.create({
            post: new mongoose.Types.ObjectId(postId),
            user: new mongoose.Types.ObjectId(userId),
            comment,
            parent: new mongoose.Types.ObjectId(parentCommentId)
          });
    
          return created;
        } catch (error) {
          throw error;
        }
    } 

    async getReply(parentId){
        try {
            const comments = await Comment.aggregate([
                {
                    $match : {
                        parent : new mongoose.Types.ObjectId(parentId)
                    }
                },
                {
                    $lookup : {
                        from : "users",
                        localField : "user",
                        foreignField : "_id",
                        as : "userData"
                    }
                },
                {
                    $unwind : "$userData"
                },
                {
                    $project : {
                        comment : 1,
                        _id : 1,
                        parent : 1,
                        userData : {
                            username : 1,
                            _id : 1,
                            profilePic : 1
                        }
                    }
                }
            ])

            return comments
        } catch (error) {
            throw error
        }
    }
}

export const commentService = new CommentService()