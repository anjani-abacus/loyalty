import softDelete from "@shared/common/softDelete.js";
import prisma from "@shared/dbConfig/database.js";
import redisClient from '@shared/dbConfig/redis.js'
import buildPrismaFilters from "@shared/common/buildPrismaFilters.js";
import { getAuditLogs } from "@shared/utils/auditlogsfromPrisma.js";

export const createInfluencer = async (req, res, next) => {
    try {
        const {
            name, email, mobile, country, birth_date, pincode, wedding_date,
            state, address, district, city, area, work_anniversary_date,
            kyc_document_type, document_no,
            upi_id, account_holder_name, bank_name, ifsc_code, account_no, influencer_type_name, dealer_id
        } = req.body;
        if (!mobile) {
            return res.status(400).json({ message: "Mobile number is required" });
        }
        const existingInfluencer = await prisma.influencer_customer.findFirst({
            where: { mobile },
        });

        if (existingInfluencer) {
            return res.status(400).json({ message: "Influencer with this mobile number already exists" });
        }


        const files = req.files || {};
        const document_img_front = files?.document_img_front?.[0]?.key
            ? `${process.env.S3_PUBLIC_URL}/${files.document_img_front[0].key}`
            : undefined;
        const document_img_back = files?.document_img_back?.[0]?.key
            ? `${process.env.S3_PUBLIC_URL}/${files.document_img_back[0].key}`
            : undefined;
        const document_pan_img = files?.document_pan_img?.[0]?.key
            ? `${process.env.S3_PUBLIC_URL}/${files.document_pan_img[0].key}`
            : undefined;
        const document_bank_img = files?.document_bank_img?.[0]?.key
            ? `${process.env.S3_PUBLIC_URL}/${files.document_bank_img[0].key}`
            : undefined;


        const influencer = await prisma.influencer_customer.create({
            data: {
                name,
                email,
                country,
                mobile,
                wedding_date: wedding_date ? new Date(wedding_date) : null,
                birth_date: birth_date ? new Date(birth_date) : null,
                work_anniversary_date: work_anniversary_date ? new Date(work_anniversary_date) : null,
                referral_code: `REF${Math.floor(100000 + Math.random() * 900000)}`,
                pincode,
                state,
                address,
                district,
                city,
                area,
                kyc_document_type,
                document_no,
                document_img_front,
                document_img_back,
                document_pan_img,
                upi_id,
                account_holder_name,
                bank_name,
                ifsc_code,
                account_no,
                document_bank_img,
                influencer_type_name,

                dealer_id,

                created_by_id: req.user.id,
                created_by_name: req.user.name,
                last_wallet_update: new Date(),
            },
        });

        const welcomePoint = await prisma.point_master.findFirst({
            select: { welcome_point: true }
        });

        if (welcomePoint && welcomePoint.welcome_point > 0) {
            const prevBal = await prisma.influencer_customer.findFirst({
                where: { id: Number(influencer.id) },
                select: { current_wallet_balnc: true }
            });

            const currentBal = prevBal?.current_wallet_balnc || 0;
            const newBal = currentBal + welcomePoint.welcome_point;

            await prisma.influencer_ledger.create({
                data: {
                    date_created: new Date(),
                    influencer_id: influencer.id,
                    influencer_name: influencer.name,
                    influencer_type: influencer.influencer_type_name || '',
                    transaction_type_name: 'WELCOME',
                    credit: welcomePoint.welcome_point,
                    debit: 0,
                    balance: newBal,
                    transaction_remark: `Welcome Points of ${welcomePoint.welcome_point}`,
                    type: 'credit',
                },
            });

            await prisma.influencer_customer.update({
                where: { id: Number(influencer.id) },
                data: {
                    current_wallet_balnc: newBal,
                    last_wallet_update: new Date(),
                },
            });
        }
        return res.status(201).json({
            message: `Successfully Created User With ID:${influencer.id}`,
            data: influencer
        });

    } catch (error) {
        next(error);
    }
};
export const updateInfluencer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name, email, mobile, country, birth_date, work_anniversary_date, pincode,
            state, district, city, area, wedding_date,
            kyc_document_type, document_no,
            upi_id, account_holder_name, bank_name, ifsc_code, account_no, influencer_type_name, address, dealer_id
        } = req.body;


        const existingInfluencer = await prisma.influencer_customer.findUnique({
            where: { id: Number(id) },
        });

        if (!existingInfluencer) {
            return res.status(404).json({ message: "Influencer not found with this mobile number" });
        }
        let parsedDealerId = dealer_id ? Number(dealer_id) : null;
        if (dealer_id) {
            const checkExistingDealer = await prisma.dealer_list.findUnique({
                where: { id: parsedDealerId },
            });

            if (!checkExistingDealer) {
                return res.status(404).json({ message: "Dealer not found with this ID" });
            }
        }
        const files = req.files || {};
        const document_img_front = files?.document_img_front?.[0]?.key
            ? `${process.env.S3_PUBLIC_URL}/${files.document_img_front[0].key}`
            : undefined;
        const document_img_back = files?.document_img_back?.[0]?.key
            ? `${process.env.S3_PUBLIC_URL}/${files.document_img_back[0].key}`
            : undefined;
        const document_pan_img = files?.document_pan_img?.[0]?.key
            ? `${process.env.S3_PUBLIC_URL}/${files.document_pan_img[0].key}`
            : undefined;
        const document_bank_img = files?.document_bank_img?.[0]?.key
            ? `${process.env.S3_PUBLIC_URL}/${files.document_bank_img[0].key}`
            : undefined;

        const updatedInfluencer = await prisma.influencer_customer.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
                country,
                mobile,
                wedding_date: wedding_date ? new Date(wedding_date) : null,
                birth_date: birth_date ? new Date(birth_date) : null,
                work_anniversary_date: work_anniversary_date ? new Date(work_anniversary_date) : null,
                pincode,
                state,
                address,
                district,
                city,
                area,
                kyc_document_type,
                document_no,
                document_img_front,
                document_img_back,
                document_pan_img,
                upi_id,
                account_holder_name,
                bank_name,
                ifsc_code,
                account_no,
                document_bank_img,
                influencer_type_name,

                dealer_id: parsedDealerId,

                last_updated_on: new Date(),
                last_updated_by: req.user.name,
                last_wallet_update: new Date(),
            },

        });

        return res.status(200).json({ message: "Influencer updated successfully", data: updatedInfluencer });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        next(error);
    }
};
export const UpdateInfluencerKyc = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { kyc_status, kyc_remark } = req.body;

        const existingInfluencer = await prisma.influencer_customer.findUnique({
            where: { id: Number(id) },
        });
        if (!existingInfluencer) {
            return res.status(404).json({ message: "Influencer not found with this id" });

        }
        const updatedInfluencer = await prisma.influencer_customer.update({
            where: { id: Number(id) },
            data: {
                kyc_status,
                kyc_remark,
                kyc_verified_by_id: req.user.id,
                kyc_verified_by_name: req.user.name,
                kyc_verified_date: new Date(),
            },
        });
        return res.status(200).json({ message: "Influencer KYC updated successfully", data: updatedInfluencer });
    }
    catch (error) {
        next(error);
    }
};
export const UpdateInfluencerProfileStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status_of_profile } = req.body;
        const existingInfluencer = await prisma.influencer_customer.findUnique({
            where: { id: Number(id) },
        });

        if (!existingInfluencer) {
            return res.status(404).json({ message: "Influencer not found with this id" });
        }
        const updatedInfluencer = await prisma.influencer_customer.update({
            where: { id: Number(id) },
            data: {
                status_of_profile,
                status_change_by: req.user.id,
                status_change_by_name: req.user.name,
                status_change_date: new Date(),
            },
        });
        return res.status(200).json({ message: "Influencer status updated successfully", data: updatedInfluencer });
    }
    catch (error) {
        next(error);
    }
};
export const UpdateInfluencerActiveStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { active_status } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        const result = await prisma.influencer_customer.update({
            where: { id: Number(id) },
            data: {
                active_status,
                active_status_change_by_id: req.user.id,
                active_status_change_by_name: req.user.name,
                active_status_changed_date: new Date(),
            },
        });

        await redisClient.del(`user:${id}:refreshToken`);
        await redisClient.del(`user:${id}:accessToken`);

        return res.json({ success: true, message: "User Active Status Updated Successfully", ActiveStatus: result.active_status });

    } catch (error) {
        return next(error);
    }
};
export const UpdateInfluencerTypeName = async (req, res, next) => {

    try {
        const { influencer_type_name } = req.body;
        const { id } = req.params;
        const data = await prisma.influencer_customer.update({
            where: { id: Number(id) },
            data: {
                influencer_type_name,
            },
        });
        return res.status(200).json({ message: "Influencer type name updated successfully", data: data });
    } catch (error) {
        next(error);
    }
}
export const getInfluencerList = async (req, res, next) => {
    try {
        const { page = 1, limit = 50, filters = {} } = req.body;

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const fieldTypes = {
            date_created: "date",
            status_of_profile: "enum",
            kyc_status: "enum",
            name: "string",
            mobile: "string",
            state: "string",
            district: "string",
            id: "number"
        };

        const where = buildPrismaFilters(filters, fieldTypes);

        const whereForCounts = { ...where };
        delete whereForCounts.status_of_profile;

        const [totalCount, influencers, statusCountsRaw] = await Promise.all([
            prisma.influencer_customer.count({ where }),
            prisma.influencer_customer.findMany({
                where,
                orderBy: { date_created: "desc" },
                skip,
                take,
                include: {
                    dealer: true
                }
            }),
            prisma.influencer_customer.groupBy({
                by: ["status_of_profile"],
                _count: { _all: true },
                where: whereForCounts,
            }),
        ]);


        // Transform status counts
        const statusCounts = statusCountsRaw.reduce((acc, item) => {
            acc[item.status_of_profile] = item._count._all;
            return acc;
        }, {});

        return res.status(200).json({
            message: "Influencers fetched successfully",
            page: Number(page),
            limit: Number(limit),
            totalCount,
            totalPages: Math.ceil(totalCount / take),
            TabList: [
                { key: "Pending", count: statusCounts.PENDING || 0 },
                { key: "Approved", count: statusCounts.APPROVED || 0 },
                { key: "Reject", count: statusCounts.REJECT || 0 },
            ],
            data: influencers,
        });
    } catch (error) {
        console.error("Error fetching influencer list:", error);
        next(error);
    }
};


export const getInfluencerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const influencer = await prisma.influencer_customer.findUnique({
            where: { id: Number(id), del: false },
            include: {
                dealer: true
            }
        });

        if (!influencer) {
            return res.status(404).json({ message: "Influencer not found" });
        }
        const logs = await getAuditLogs({ table_name: 'influencer_customer', record_id: id });
        return res.status(200).json({ message: "Influencer fetched successfully", data: influencer, logs });
    } catch (error) {
        next(error);
    }
};

export const softDeleteInfluencer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const influencer = await prisma.influencer_customer.findUnique({ where: { id: Number(id) } });
        if (!influencer) return res.status(404).json({ message: 'Not found' });
        await softDelete('influencer_customer', 'id', parseInt(id));
        const redisKey = `influencers:byUser:${influencer.created_by_id}`;
        await redisClient.hDel(redisKey, influencer.mobile);
        res.status(200).json({ message: 'Influencer Customer deleted successfully' });
    } catch (error) {
        next(error);
    }
}
