import { followService } from "../services/follow.service.js";

export const getFollowers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const userId = req.userId;

        const followers = await followService.getFollowers({
            userId,
            page: parseInt(page),
            limit: parseInt(limit),
        });

        res.status(200).json({
            message: "Followers fetched successfully",
            data: followers,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFollowing = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const userId = req.userId;

        const following = await followService.getFollowing({
            userId,
            page: parseInt(page),
            limit: parseInt(limit),
        });

        res.status(200).json({
            message: "Following list fetched successfully",
            data: following,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkIsFollowing = async (req, res) => {
    try {
        const { followId } = req.params;
        const userId = req.userId

        const isFollowing = await followService.isFollowing({ userId, followId });

        res.status(200).json({
            message: `Follow status fetched successfully`,
            isFollowing,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
