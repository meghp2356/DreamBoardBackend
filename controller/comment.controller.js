import { commentService } from "../services/comment.service"

export const postCommentOnPost = async (req,res) => {
    try {
        const { postId , comment } = req.body

        if(!postId || !comment){
            res.status(400).json({message : "postId or comment is missing"})
        }

        const createdComment = await commentService.postCommentOnPost({postId,comment , userId : req.userId})
        
        res.status(200).json({comment : createdComment})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const postCommentOnComment = async (req, res) => {
    try {
        const { parentCommentId, comment, postId } = req.body;

        if (!comment || !parentCommentId || !postId) {
            return res.status(400).json({ message: "parentCommentId, comment or postId is missing" });
        }

        const createdComment = await commentService.postCommentOnComment({
            postId,
            comment,
            userId: req.userId,
            parentCommentId
        });

        res.status(200).json({ comment: createdComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
    

export const getCommentForPost = async (req , res) => {
    try {
        const { postId } = req.params
        
        const comments = await commentService.getCommet(postId)

        res.status(200).json({comments})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const getReply = async (req , res) => {
    try {
        const { parentId } = req.params
        
        const comments = await commentService.getReply(parentId)

        res.status(200).json({comments})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

