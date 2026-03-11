import softDelete from "@shared/common/softDelete.js";
import prisma from "@shared/dbConfig/database.js";
import buildPrismaFilters from "@shared/common/buildPrismaFilters.js";
import { config } from "@shared/utils/env.js";

export const createBadge = async (req, res, next) => {
    try {
        const {
            influencer_type,
            title,
            point_value,
            scan_count,
            state
        } = req.body;
        const { id, name } = req.user;
        const lastBadge = await prisma.influencer_badge.findFirst({
            where: { influencer_type: { array_contains: influencer_type }, state: { array_contains: state }, del: false },
            orderBy: { point_value: "desc" }
        });

        if (lastBadge && Number(point_value) <= lastBadge.point_value) {
            return res.status(400).json({
                status: false,
                message: ` Point must be greater than existing badge's! `
            });
        }

        const image = req.file?.key ? `${config.s3.publicUrl}/${req.file.key}` : null;
        const badge = await prisma.influencer_badge.create({
            data: {
                influencer_type,
                title,
                scan_count: Number(scan_count),
                point_value: Number(point_value),
                image,
                state,
                created_by_id: id,
                created_by_name: name
            }
        })

        res.status(200).json({
            status: true,
            message: "Badge created successfully",
            data: badge
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const enrollInfluencerBadge = async (req, res, next) => {
    try {
        const { id } = req.params;

        const exist = await prisma.user_badge_activate.findFirst({
            where: { badge_id: Number(id) }
        })
        if (!exist) {
            return res.status(404).json({ message: "No influencer enrolled yet!", data: [] });
        }
        const influencerList = await prisma.influencer_customer.findMany({
            where: {
                id: exist?.user_id,
                del: false,
                status_of_profile: 'APPROVED',
            }
        })
        if (influencerList.length === 0) {
            return res.status(404).json({ message: "No influencer enrolled yet!", data: [] });
        }
        return res.status(200).json({ message: "User is eligible for badge enrollment", data: influencerList });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", data: [] });
        next(error)
    }
}
export const updateBadge = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updateStaus = await prisma.influencer_badge.update({
            where: { id: Number(id) },
            data: {
                status,
                last_updated_by: new Date(),
                last_updated_by_id: req.user.id,
                last_updated_by_name: req.user.name
            }
        })
        res.status(200).json(
            {
                status: true, message: "Updated!"
                , data: updateStaus
            }
        )
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAllBadges = async (req, res, next) => {
    const { page = 1, limit = 50, filters = {} } = req.body;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    try {
        const fieldTypes = {
            status: "boolean",
            date_created: "date"
        };

        const where = buildPrismaFilters(filters, fieldTypes);
        const badges = await prisma.influencer_badge.count({ where: { del: false } });
        const totalActive = await prisma.influencer_badge.count({ where: { status: true, del: false } });
        const totalInactive = badges - totalActive;
        const badgesData = await prisma.influencer_badge.findMany({
            where,
            skip,
            take,
            orderBy: { date_created: 'desc' },

        });
        res.status(200).json({ Status: true, message: "Badges fetched successfully", count: badges, totalActive, totalInactive, data: badgesData });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const softDeleteinfluencerbadges = async (req, res, next) => {
    try {
        const { id } = req.params;

        await softDelete('influencer_badge', 'id', Number(id));
        res.status(200).json({ message: "Badge deleted successfully" });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

