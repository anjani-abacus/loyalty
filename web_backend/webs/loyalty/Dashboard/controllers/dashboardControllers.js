import prisma from "@shared/dbConfig/database.js";
import { DateTime } from "luxon";

export const availableGift = async (req, res, next) => {
    try {
        const availableGift = await prisma.gift_gallery_master.findMany({
            where: { del: false }, orderBy: { date_created: 'desc' },

        });
        res.status(200).json({ success: true, data: availableGift })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        next(error)
    }
}

export const pendingRedeemReqCount = async (req, res, next) => {
    try {
        const [pendingRedeemReqCount, redeemRequestCount] = await Promise.all([
            prisma.gift_redeem_request.count({ where: { action_status: 'PENDING', del: false } }),
            prisma.gift_redeem_request.count({ where: { del: false } })
        ])

        res.status(200).json({ success: true, pendingRedeemReqCount, redeemRequestCount })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        next(error)
    }
}
export const giftStatusCount = async (req, res, next) => {
    try {
        const giftStatusCount = await prisma.gift_redeem_request.groupBy({
            by: ['gift_status'],
            _count: { gift_status: true },
            where: { del: false },
        });

        const summary = {
            INPROGRESS: 0,
            SHIPPED: 0,
            DELIVERED: 0,
            TOTAL: 0,
        };

        giftStatusCount.forEach(item => {
            summary[item.gift_status] = item._count.gift_status;
            summary.TOTAL += item._count.gift_status;
        });

        res.status(200).json({ success: true, data: summary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
        next(error);
    }
};


export const countInfluencerStateWise = async (req, res, next) => {
    try {
        const report = await prisma.influencer_customer.groupBy({
            by: ['state'],
            _count: { id: true },
            where: { del: false },
        });

        const formatted = report.map(r => ({
            state: r.state || 'Unknown',
            total_influencers: r._count.id,
        }));

        res.status(200).json({
            message: "Influencer count by state fetched successfully",
            data: formatted,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
        next(error);
    }
};


export const getInfluencerDataforCharts = async (req, res, next) => {
    try {
        const [totalInfluencers, activeInfluencers, inactiveInfluencers, influencerTypeCount, InfluencerKycStatusWise, influencerProfileStatus, Top30] = await Promise.all([
            prisma.influencer_customer.count({ where: { del: false } }),
            prisma.influencer_customer.count({
                where: { active_status: true, del: false },
            }),
            prisma.influencer_customer.count({
                where: { active_status: false, del: false },
            }),

            prisma.influencer_customer.groupBy({
                by: ['influencer_type_name'],
                _count: {
                    influencer_type_name: true,
                },
            }),
            prisma.influencer_customer.groupBy({
                by: ['kyc_status'],
                _count: {
                    kyc_status: true,
                },
            }),
            prisma.influencer_customer.groupBy({
                by: ['status_of_profile'],
                _count: {
                    status_of_profile: true,
                },
            }),
            prisma.influencer_customer.findMany({
                select: {
                    name: true,
                    current_wallet_balnc: true,
                },
                orderBy: {
                    current_wallet_balnc: 'desc'
                },
                take: 30
            }),

        ]);

        const influencerData = {
            totalInfluencers,
            activeInfluencers,
            inactiveInfluencers,
            influencerTypeWiseCount: influencerTypeCount.map((type) => ({
                type: type.influencer_type_name || 'Unknown',
                count: type._count.influencer_type_name,
            })),
            InfluencerKycStatusWise: InfluencerKycStatusWise.map((type) => ({
                type: type.kyc_status || 'Unknown',
                count: type._count.kyc_status,
            })),
            influencerProfileStatus: influencerProfileStatus.map((type) => ({
                type: type.status_of_profile || 'Unknown',
                count: type._count.status_of_profile,
            })),
            Top30
        };
        res.status(200).json({ success: true, data: influencerData });
    } catch (error) {
        console.error('Error fetching influencer data:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
        next(error);
    }
};

export const getCouponDataforCharts = async (req, res, next) => {
    try {
        const [totalGeneratedCoupons, activeCoupons, scannedCoupons, last30dayScanning] = await Promise.all([
            prisma.offer_coupon.count({ where: { del: false } }),
            prisma.offer_coupon.count({
                where: {
                    is_Scanned: true, del: false
                },
            }),
            prisma.offer_coupon.count({
                where: {
                    is_Scanned: false, del: false
                },
            }),
            await prisma.offer_coupon.findMany({
                where: {
                    offer_coupon_scan: {
                        some: {
                            scanned_date: {
                                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                            }
                        }
                    }
                },
                select: {
                    coupon_code: true,
                    product_detail: true,
                    offer_coupon_scan: {
                        select: {
                            scanned_by_name: true,
                            scanned_date: true,
                            state: true,
                            total_point: true
                        }
                    }
                },
                orderBy: {
                    date_created: 'desc'
                }
            }),


        ]);


        res.status(200).json({
            success: true,
            offerCoupondata: {
                totalGeneratedCoupons,
                activeCoupons,
                scannedCoupons,
                last30dayScanning,
            }
        });
    } catch (error) {
        console.error('Error fetching influencer data:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
        next(error);
    }

}


export const last6MonthScanVsGenerated = async (req, res, next) => {
    try {
        const sixMonthsAgo = DateTime.now().minus({ months: 5 }).startOf('month').toJSDate();

        const records = await prisma.offer_coupon.findMany({
            where: {
                date_created: { gte: sixMonthsAgo },
            },
            orderBy: { date_created: 'desc' },
            select: {
                date_created: true,
                is_Scanned: true,
            },
        });

        const months = Array.from({ length: 6 }).map((_, i) => {
            const dt = DateTime.now().minus({ months: 5 - i });
            const key = dt.toFormat("MMM-yyyy");
            return { key, scanned: 0, generated: 0 };
        });

        for (const rec of records) {
            const monthKey = DateTime.fromJSDate(rec.date_created).toFormat("MMM-yyyy");
            const found = months.find(m => m.key === monthKey);
            if (found) {
                if (rec.is_Scanned) found.scanned += 1;
                else found.generated += 1;
            }
        }

        res.status(200).json({
            message: "Last 6 months Scan vs Generated report fetched successfully",
            data: months.map(m => ({
                month: m.key,
                scanned: m.scanned,
                generated: m.generated,
            })),
        });

    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: error.message });
        next(error);
    }
};

export const getTicketsStats = async (req, res, next) => {
    try {
        const [AllTickets, openTickets, closedTickets,] = await Promise.all([
            prisma.tickets.count({ where: { del: false } }),
            prisma.tickets.count({ where: { ticket_status: 'PENDING', del: false } }),
            prisma.tickets.count({ where: { ticket_status: 'CLOSED', del: false } }),
        ]);

        res.status(200).json({
            success: true,
            data: {
                AllTickets,
                openTickets,
                closedTickets,
            },
        });
    } catch (error) {
        console.error('Error fetching ticket stats:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
        next(error);
    }
};