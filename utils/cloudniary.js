import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"; // ✅ Changed from import "fs" to avoid confusion

cloudinary.config({ 
    cloud_name: process.env.cloudinary_cloud_name, 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_api_secret
});

export const cloudinaryUploader = async (fileUrl) => {
    try {
        if (!fileUrl) {
            throw new Error("No file URL provided");
        }

        const result = await cloudinary.uploader.upload(fileUrl, {
            resource_type: 'image',
        });

        return result;
    } catch (error) {

        console.error("Upload error:", error);
        throw error;
        
    } 
    finally {
        // 🟨 Optimization Note: Replace this backend upload logic with
        // 🔁 direct-to-Cloudinary upload from frontend using signed URLs
        // 🔐 You can generate the signature from backend and send to client
        // ⚡️ This will reduce latency and offload image handling from server

        if (fileUrl && fs.existsSync(fileUrl)) {
            fs.unlinkSync(fileUrl); // 🧹 Ensure cleanup
        }
    }
};
