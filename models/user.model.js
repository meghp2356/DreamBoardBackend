import mongoose from "mongoose";
import bycprt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
        trim : true,
    },
    savedPost : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ],
    following : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    },
    profilePic : {
        type : String
    }
})

userSchema.pre("save", async  function(next){
    if(this.isModified("password")){
        this.password = await bycprt.hash(this.password,10)
    }
    next()
})

userSchema.methods.comparePassword = async function(password){
    return await bycprt.compare(password,this.password)
}

userSchema.methods.createAccessToken= function () {
    return jwt.sign({
        id : this._id
    },
    process.env.SECRET_KEY,
    {
        expiresIn : "3h"
    }
)
}

export const User = mongoose.model("User",userSchema)