import mongoose from "mongoose";
import { follow } from "../models/follow.model";
import { User } from "../models/user.model";

class FollowService {
    async getFollowers({ userId, page = 1, limit = 10 }) {
        try {
            const skip = (page - 1) * limit;

            const followers = await follow
                .find({ follow: new mongoose.Types.ObjectId(userId) })
                .skip(skip)
                .limit(limit)
                .populate("user", "username profilePic") // Populate follower info
                .lean();

            return followers.map(f => f.user); // Return array of users
        } catch (error) {
            throw error;
        }
    }

    async getFollowing({ userId, page = 1, limit = 10 }) {
        try {
            const skip = (page - 1) * limit;

            const following = await follow
                .find({ user: new mongoose.Types.ObjectId(userId) })
                .skip(skip)
                .limit(limit)
                .populate("follow", "username profilePic") // Populate following info
                .lean();

            return following.map(f => f.follow); // Return array of users
        } catch (error) {
            throw error;
        }
    }

     async isFollowing({ userId, followId }) {
        try {
            const existing = await follow.findOne({
                user: new mongoose.Types.ObjectId(userId),
                follow: new mongoose.Types.ObjectId(followId),
            });

            return !!existing; // true if follows, false if not
        } catch (error) {
            throw error;
        }
    }
}

export const followService = new FollowService();
