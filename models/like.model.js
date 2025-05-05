import mongoose from "mongoose"

const likeSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    postId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }
},{
    timestamps: true
})

export const Like = mongoose.model("Like",likeSchema)