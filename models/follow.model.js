import mongoose from "mongoose";

const followSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    follows : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
})

followSchema.index({ user: 1, follow: 1 }, { unique: true });

export const Follow = mongoose.model("Follow",followSchema)