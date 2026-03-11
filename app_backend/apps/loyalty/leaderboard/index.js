import { prisma } from "@shared/config/database";
import { DateTime } from "luxon";

// Helper to get date range in IST
export const getDateRangeIST = (period) => {
    const nowIST = DateTime.now().setZone("Asia/Kolkata");
    switch (period) {
        case "week":
            return { gte: nowIST.startOf("week").toUTC().toJSDate() };
        case "month":
            return { gte: nowIST.startOf("month").toUTC().toJSDate() };
    }
};

// Build leaderboard
const buildLeaderboard = async (filter = {}) => {
    const periods = ["week", "month"];
    const leaderboard = {};

    for (const period of periods) {
        const dateRange = getDateRangeIST(period);

        const entries = await prisma.influencer_customer.findMany({
            where: {
                date_created: dateRange,
                current_wallet_balnc: { not: null, gt: 0 }, // ignore users with null balance
                ...filter
            },
            orderBy: [{ current_wallet_balnc: "desc" }],
            select: { id: true, name: true, current_wallet_balnc: true },
            take: 10
        });

        if (!entries.length) {
            leaderboard[period] = []
        } else {
            leaderboard[period] = entries;
        }
    }

    return leaderboard;
};

// Helper to calculate rank
const getRank = async (userBalance, period, filter = {}) => {
    const dateRange = getDateRangeIST(period);

    const count = await prisma.influencer_customer.count({
        where: {
            date_created: dateRange,
            current_wallet_balnc: { gt: userBalance },
            ...filter
        }
    });

    return count + 1;
};


// Leaderboard by state
export const getLeaderBoardByState = async (req, res, next) => {
    try {
        const { state } = req.user;
        if (!state)
            return res.status(400).json({ success: false, message: "State is required" });

        const leaderboard = await buildLeaderboard({ state });
        res.json({ success: true, leaderboard });
    } catch (error) {
        next(error);
    }
};

// Leaderboard by district
export const getLeaderBoardByDistrict = async (req, res, next) => {
    try {
        const { district } = req.user;
        if (!district)
            return res.status(400).json({ success: false, message: "District is required" });

        const leaderboard = await buildLeaderboard({ district });
        res.json({ success: true, leaderboard });
    } catch (error) {
        next(error);
    }
};

// Get user's full rank
export const getUserFullRank = async (req, res, next) => {
    try {
        const { id, state, district } = req.user;
        if (!id) return res.status(400).json({ success: false, message: "User id required" });

        const user = await prisma.influencer_customer.findUnique({
            where: { id },
            select: { id: true, name: true, current_wallet_balnc: true }
        });

        if (!user)
            return res.status(404).json({ success: false, message: "AHAA! Gain Some Points" });

        // If balance is null, return unranked
        if (user.current_wallet_balnc === null) {
            return res.json({
                success: true,
                user: {
                    ...user,
                    ranks: { overall: null, state: null, district: null },
                    message: "No balance yet, no rank available"
                }
            });
        }

        const userBalance = Number(user.current_wallet_balnc);

        // Calculate ranks
        const stateWeekRank = state ? await getRank(userBalance, "week", { state }) : null;
        const stateMonthRank = state ? await getRank(userBalance, "month", { state }) : null;

        const districtWeekRank = district ? await getRank(userBalance, "week", { district }) : null;
        const districtMonthRank = district ? await getRank(userBalance, "month", { district }) : null;


        return res.json({
            success: true,
            user: {
                ...user,
                ranks: {
                    state: {
                        week: stateWeekRank,
                        month: stateMonthRank
                    },
                    district: {
                        week: districtWeekRank,
                        month: districtMonthRank
                    }
                }
            }
        });

    } catch (error) {
        next(error);
    }
};
