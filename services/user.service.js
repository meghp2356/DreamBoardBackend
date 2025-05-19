import mongoose from "mongoose";
import { User } from "../models/user.model";
import { follow } from "../models/follow.model"; // fix: you were importing from controller

class UserService {
    async updateProfilePic({ userId, url }) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(userId) },
                { $set: { profilePic: url } },
                { new: true } // return updated document
            ).select("profilePic username email savedPost ");

            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    async followToggle({ userId, followId }) {
        try {
            const check = await follow.findOne({
                user: new mongoose.Types.ObjectId(userId),
                follow: new mongoose.Types.ObjectId(followId)
            });

            if (check) {
                await follow.deleteOne({ _id: check._id });
                return { following: false }; // unfollowed
            } else {
                await follow.create({
                    user: new mongoose.Types.ObjectId(userId),
                    follow: new mongoose.Types.ObjectId(followId)
                });
                return { following: true }; // followed
            }
        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService();
