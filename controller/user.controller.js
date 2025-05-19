import { cloudinaryUploader } from "../utils/cloudniary"
import { userService } from "../services/user.service"

export const updateProfileUser = async (req, res) => {
    try {
        // Validate file input
        const file = req.file?.path;
        if (!file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Upload to cloudinary
        const uploadedImage = await cloudinaryUploader(file);
        const url = uploadedImage?.url;

        if (!url) {
            return res.status(500).json({ message: "Failed to upload image" });
        }

        // Update user's profile pic
        const updatedUser = await userService.updateProfilePic({
            userId: req.userId,
            url,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond
        return res.status(200).json({
            message: "Profile picture updated successfully",
            data: updatedUser,
        });

    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const follow = async (req, res) => {
    try {
        const { follow: followId } = req.params;
        const userId = req.userId;

        if (!followId) {
            return res.status(400).json({ message: "Target user ID is required" });
        }

        if (userId === followId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const result = await userService.followToggle({
            userId,
            followId,
        });

        return res.status(200).json({
            message: result.following
                ? "User followed successfully"
                : "User unfollowed successfully",
        });

    } catch (error) {
        console.error("Follow toggle error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
