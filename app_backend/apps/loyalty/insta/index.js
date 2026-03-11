import { prisma } from "@shared/config/database";
import { config } from "@shared/config/env";
import { getLedgerBalanceInfluencer } from "@shared/helpers/commonHandler.js";

export const CreatePost = async(req,res,next)=>{
try {
    const {id,name}=req.user;
    const {description} = req.body;
    const img = req.file?.key
        ? `${config.s3.publicUrl}/${req.file.key}`
        : null;
    const { balance: prevBal } = await getLedgerBalanceInfluencer(id);

    const post = await prisma.post_and_Earn.create({
        data: {
            description, ...(img ? { img } : {}),
            user_id: id,
            user_name: name,
            total_points:prevBal?.current_wallet_balnc
        },
    });
    res.status(200).json({ message: 'Post created successfully',data:post });
} catch (error) {
    next(error);
}
}
export const GetPost = async (req, res, next) => {
    try {
        const { balance: prevBal } = await getLedgerBalanceInfluencer(req.user.id);

        const posts = await prisma.post_and_Earn.findMany({
            where: {
                user_id: req.user.id,
            },
            select: {
                id: true,
                img: true,
                description: true,
                post_createdon: true,
                total_likecount: true, 
            },
            orderBy: {
                post_createdon: "desc",
            },
        });

        const totalLikes = posts.reduce((sum, post) => sum + (post.total_likecount || 0), 0);

        res.status(200).json({
            message: "Posts fetched successfully",
            user_name: req.user.name,
            profile:req.user.profile,
            total_Posts: posts.length,
            total_points: prevBal?.current_wallet_balnc,
            total_likes: totalLikes,
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};


export const likePost = async (req, res, next) => {
    const { post_id } = req.body;
    const user_id = req.user.id;

    try {
        
        const existing = await prisma.post_and_Earn_instafeedlikes.findUnique({
            where: { user_id_post_id: { user_id, post_id: Number(post_id) } },
        });

        if (existing) {
            
            await prisma.post_and_Earn_instafeedlikes.delete({
                where: { user_id_post_id: { user_id, post_id: Number(post_id) } },
            });

            await prisma.post_and_Earn.update({
                where: { id: Number(post_id) },
                data: { total_likecount: { decrement: 1 } },
            });

            return res.json({ status: "unliked" });
        } else {
            await prisma.post_and_Earn_instafeedlikes.create({
                data: { user_id, post_id: Number(post_id) },
            });

            await prisma.post_and_Earn.update({
                where: { id: Number(post_id) },
                data: { total_likecount: { increment: 1 } },
            });

            return res.json({ status: "liked" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};


export const getALLPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post_and_Earn.findMany({
            select: {
                id: true,
                user_id: true,
                user_name: true,
                img: true,
                description: true,
                post_createdon: true
            },
            orderBy: {
                post_createdon: "desc",
            }
    });
        res.status(200).json({ message: "Posts fetched successfully", data: posts });
    } catch (error) {
        next(error)
        ;
    }
}
