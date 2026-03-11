import prisma from "@shared/dbConfig/database.js";

export const getPostAndEarn = async (req, res, next) => {
    try {
        const page = Number(req.body?.page || req.query?.page || 1);
        const limit = Number(req.body?.limit || req.query?.limit || 50);

        const skip = (page - 1) * limit;
        const take = limit;
        const count = await prisma.post_and_Earn.count({ where: { del: false } });
        const data = await prisma.post_and_Earn.findMany({
            where: { del: false },
            include: {
                post_and_Earn_instafeedlikes: true
            },
            orderBy: {
                date_created: 'desc'
            },
            skip,
            take
        });
        return res.status(200).json({ success: true, data: data, count })
    } catch (error) {
        console.error('Error fetching influencer data:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
        next(error);
    }
}