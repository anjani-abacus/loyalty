import { differenceInCalendarDays, differenceInDays } from "date-fns";
import { prisma } from "@shared/config/database.js";
import { getLedgerBalanceInfluencer } from "@shared/helpers/commonHandler";

function formatProgress(streak) {
    return {
        user_id: streak.user_id,
        streak_count: streak.streak_count,
        progress: `${streak.streak_count}/7`,
        reward_cycles: streak.reward_cycles,
        reward_claimed: streak.reward_claimed,
    };
}

// export const updateStreak = async (id) => {
//     try {
//         let streak = await prisma.user_streaks.findFirst({ where: { user_id: id } });
//         const now = new Date();

//         if (!streak) {
//             streak = await prisma.user_streaks.create({
//                 data: {
//                     user_id: id,
//                     streak_count: 1,
//                     last_active_date: now,
//                     reward_claimed: false,
//                     reward_cycles: 0,
//                 },  
//             });
//             return formatProgress(streak);
//         }

//         const diff = differenceInCalendarDays(now, new Date(streak.last_active_date));

//         if (diff === 1) {
//             streak = await prisma.user_streaks.update({
//                 where: { user_id: id },
//                 data: {
//                     streak_count: streak.streak_count + 1,
//                     last_active_date: now,
//                 },
//             });
//         } else if (diff > 1) {
//             streak = await prisma.user_streaks.update({
//                 where: { user_id: id },
//                 data: {
//                     streak_count: 1,
//                     last_active_date: now,
//                     reward_claimed: false,
//                 },
//             });
//         } else {
//             return formatProgress(streak); 
//         }

//         if (streak.streak_count === 7) {
//             const { balance: prevBal } = await getLedgerBalanceInfluencer(id);

//             await prisma.influencer_ledger.create({
//                 data: {
//                     dateCreated: now,
//                     influencerId: id,
//                     influencerName: "User",
//                     influencerType: "Loyalty",
//                     transactionType: "Streak",
//                     credit: 100,
//                     debit: 0,
//                     balance: prevBal + 100,
//                     transactionRemark: "Points against Streak 100",
//                     type: "credit",
//                 },
//             });

//             streak = await prisma.user_streaks.update({
//                 where: { user_id: id },
//                 data: {
//                     reward_claimed: true,
//                     reward_cycles: streak.reward_cycles + 1,
//                     streak_count: 0,
//                 },
//             });
//         }

//         //  Update influencer current wallet balance
//         const { balance: prevBal } = await getLedgerBalanceInfluencer(id);        await tx.influencer_customer.update({
//             where: { id },
//             data: {
//                 current_wallet_balnc: prevBal,
//                 last_wallet_update: new Date(),
//                 last_scan_date: new Date()
//             },
//         });
//         return formatProgress(streak);

//     } catch (err) {
//         console.error("updateStreak error:", err);
//         throw err;
//     }
// };

export const updateStreak = async (id) => {
    const now = new Date();

    try {
        const result = await prisma.$transaction(async (tx) => {
            let streak = await tx.user_streaks.findFirst({ where: { user_id: id } });

            if (!streak) {
                const newStreak = await tx.user_streaks.create({
                    data: {
                        user_id: id,
                        streak_count: 1,
                        last_active_date: now,
                        reward_claimed: false,
                        reward_cycles: 0,
                    },
                });
                return formatProgress(newStreak);
            }

            const diff = differenceInCalendarDays(now, new Date(streak.last_active_date));

            if (diff === 1) {
                streak = await tx.user_streaks.update({
                    where: { user_id: id },
                    data: {
                        streak_count: streak.streak_count + 1,
                        last_active_date: now,
                    },
                });
            } else if (diff > 1) {
                streak = await tx.user_streaks.update({
                    where: { user_id: id },
                    data: {
                        streak_count: 1,
                        last_active_date: now,
                        reward_claimed: false,
                    },
                });
            } else {
                return formatProgress(streak);
            }

            if (streak.streak_count === 7) {
                const { balance: prevBal } = await getLedgerBalanceInfluencer(id);

                await tx.influencer_ledger.create({
                    data: {
                        date_created: now,
                        influencer_id: id,
                        influencer_name: 'User',
                        influencer_type: 'Loyalty',
                        transaction_type_name: 'Streak',
                        credit: 100,
                        debit: 0,
                        balance: prevBal + 100,
                        transaction_remark: 'Points awarded for 7-day streak',
                        type: 'credit',
                    },
                });

                streak = await tx.user_streaks.update({
                    where: { user_id: id },
                    data: {
                        reward_claimed: true,
                        reward_cycles: streak.reward_cycles + 1,
                        streak_count: 0,
                    },
                });

                await tx.influencer_customer.update({
                    where: { id },
                    data: {
                        current_wallet_balnc: prevBal + 100,
                        last_wallet_update: new Date(),
                        last_scan_date: new Date(),
                    },
                });
            }

            return formatProgress(streak);
        });

        return result;
    } catch (err) {
        console.error('updateStreak error:', err);
        throw err;
    }
};

export const getStreakProgress = async (req, res, next) => {
    try {
        const id = req.user.id;
        let streak = await prisma.user_streaks.findFirst({ where: { user_id: id } });

        if (!streak) {
            return res.json({
                user_id: id,
                streak_count: 0,
                progress: "0/7",
                reward_cycles: 0,
                reward_claimed: false,
            });
        }

        // ✅ Ensure reset reflects here too
        const diff = differenceInDays(new Date(), new Date(streak.last_active_date));
        if (diff > 1 && streak.streak_count !== 0) {
            streak = await prisma.user_streaks.update({
                where: { user_id: id },
                data: {
                    streak_count: 0,
                    last_active_date: new Date(),
                    reward_claimed: false,
                },
            });
        }

        return res.json(formatProgress(streak));
    } catch (error) {
        return next(error);
    }
};
