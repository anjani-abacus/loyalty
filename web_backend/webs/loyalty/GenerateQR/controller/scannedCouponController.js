import prisma from "@shared/dbConfig/database.js";


export const getAllScannedCoupon = async (req, res, next) => {
    const { page = 1, limit = 50, filters = {} } = req.body;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    try {
        const scannedCouponCount = await prisma.offer_coupon_scan.count({ where: { del: false } });
        const scannedCoupon = await prisma.offer_coupon_scan.findMany({
            where: { ...filters },
            skip,
            take,
            orderBy: { date_created: 'desc' },

        })
        return res.status(200).json({
            status: true,
            message: "Scanned coupon fetched successfully",
            count: scannedCouponCount,
            data: scannedCoupon
        })
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}   
