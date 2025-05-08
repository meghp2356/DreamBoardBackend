import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    },
    reply : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    },
    comment : {
        type : String,
        require : true 
    },
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment",
        default : null
    }
},{ timestamps : true})

commentSchema.index({ post: 1 });
commentSchema.index({ user: 1 });

export const Comment = mongoose.model("Comment",commentSchema)