import prisma from "@shared/dbConfig/database.js";
import buildPrismaFilters from "@shared/common/buildPrismaFilters.js";
export const getAllredeemRequest=async(req,res,next)=>{
    const { page = 1, limit = 20 ,filters={}} = req.body;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    try {
        const fieldTypes = {
            req_id: "string",
            status: "boolean",
            date_created: "date",
            gift_type:"enum",
            action_status:"enum",
            gift_status:"enum",
            user_name:"string",
            user_mobile:"string",
            bank_name:"string",
            account_number:"string",
            ifsc_code:"string",
            upi_id:"string",
            state:"string",
            district:"string",
        };

    const where = buildPrismaFilters(filters, fieldTypes);
    const response=  await  prisma.gift_redeem_request.findMany({
        where,
        skip,
        take,
        orderBy:{date_created:"desc"}
      })
        const [statusCountsRaw, total,  giftStatusCounts] = await Promise.all([
            prisma.gift_redeem_request.groupBy({
                by: ["action_status"],
                _count: { _all: true },
                where: {  del: false },
            }),
            prisma.gift_redeem_request.count({
                where: {  del: false },
}),
            prisma.gift_redeem_request.groupBy({
                by: ["gift_status"],
                _count: { _all: true },
                where: { del: false },
            }),
        ]);

        const statusCounts = statusCountsRaw.reduce((acc, item) => {
            acc[item.action_status] = item._count._all;
            return acc;
        }, {});

        const giftStatusCount = giftStatusCounts.reduce((acc, item) => {
            acc[item.gift_status] = item._count._all;
            return acc;
        }, {});
        
       
     res.status(201).json({status:true,message:"Successfully Fetch",
         totalCount: total,
         TabList: [
             { key: "Pending", count: statusCounts.PENDING || 0 },
             { key: "Approved", count: statusCounts.APPROVED || 0 },
             { key: "Reject", count: statusCounts.REJECT || 0 },
             { key: "Shipped", count: giftStatusCount.SHIPPED || 0 },
             { key: "Delivered", count: giftStatusCount.DELIVERED || 0 },
         ],
        data:response}) 
    } catch (error) {
        next(error)
    }
}
export const getRedeemRequestById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await prisma.gift_redeem_request.findMany({
            where: { user_id: Number(id) },
            orderBy: { date_created: "desc" }
        });
        return res.status(200).json({ status: true, message: "Successfully Fetch", data: response });

    } catch (error) {
        next(error);
    }
}

export const updateRedeemRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { action_status} = req.body;
        const requestDetails = await prisma.gift_redeem_request.findUnique({
            where: { id: Number(id) },
        });

        if (!requestDetails) {
            return res.status(404).json({ message: 'Redeem request not found' });
        }
        if(action_status==="REJECT"){
            
            if(requestDetails){
                await prisma.influencer_customer.update({
                    where: { id: requestDetails.user_id },
                    data: {
                        current_wallet_balnc: {
                            increment: requestDetails.redeem_point,
                        },
                    },
                });
                const prevBal = await prisma.influencer_customer.findFirst({
                    where: { id: Number(requestDetails.user_id) },
                    select: { current_wallet_balnc: true }
                });
                
                await prisma.influencer_ledger.create({
                    data: {
                        date_created: new Date(),
                        influencer_id:requestDetails.user_id,
                        influencer_name: requestDetails.user_name,
                        influencer_type: requestDetails.influencer_type || '',
                        transaction_type_name: 'REJECT REQUEST',
                        credit: requestDetails.redeem_point,
                        debit: 0,
                        balance: prevBal?.current_wallet_balnc  || 0,
                        transaction_remark: `Reject Gift Request refund of ${requestDetails.redeem_point} points`,
                        type: 'credit',
                    },
                });
            }
        }
        await prisma.gift_redeem_request.update({
            where: { id: Number(id) },
            data: { action_status }
        });
        res.status(200).json({ message: 'Redeem Request Status updated successfully' });
    } catch (error) {
        next(error);
    }
}

export const updateShippingDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { gift_status, shipping_address, shipping_type, shipping_remark, estimate_delivery_date } = req.body;

        const request = await prisma.gift_redeem_request.findUnique({
            where: { id: Number(id) },
        });

        if (!request) {
            return res.status(404).json({ status: false, message: 'Redeem request not found' });
        }

        if (request.action_status !== 'APPROVED') {
            return res.status(400).json({
                status: false,
                message: 'Shipping details can only be updated for APPROVED requests',
            });
        }

        const updated = await prisma.gift_redeem_request.update({
            where: { id: Number(id) },
            data: {
                gift_status,
                shipping_date: new Date(),
                shipping_address,
                shipping_remark,
                shipping_type,
                estimate_date: estimate_delivery_date ? new Date(estimate_delivery_date) : null,
            },
        });

        res.status(200).json({
            status: true,
            message: 'Shipping details updated successfully',
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};
