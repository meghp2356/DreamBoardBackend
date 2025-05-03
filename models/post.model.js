import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : String,
        require : true
    },
    tags : [{
        type : String
    }],
    likeCount : {
        type : Number,
        default : 0
    }
},{
    timestamps: true
})

postSchema.index({userId : 1})

export const Post = mongoose.model("Post",postSchema)