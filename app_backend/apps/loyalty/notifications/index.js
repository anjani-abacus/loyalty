import { prisma } from "@shared/config/database.js"


export const getNotifications = async (req, res, next) => {
    const {type} = req.body
  try {
      const Ddata = await prisma.sfa_push_notification.findMany({...(type=='Unread' && {where:{del:false}}), orderBy:{id:'desc'}})
    return res.status(201).json({ status: true, data: Ddata })
  } catch (error) {
    next(error)
  }
}

export const sendNotification = async (req, res, next) => {
    try {
        const {id, title, msg, } = req.body;

        const notification = await prisma.sfa_push_notification.create({
            data: {
                title,
                msg,
            },
        });

        return res.status(201).json({ status: true, data: notification });
    } catch (error) {           
        next(error);
    }
};

export const setReadNotification = async (req, res, next) => {
    try {
        const { id } = req.body;

        const result = await prisma.sfa_push_notification.updateMany({
            where: { id: Number(id) },
            data: { del: true }
        });

        if (result.count === 0) {
            return res.status(404).json({ status: false, message: "Notification not found!" });
        }

        return res.status(200).json({ status: true, message: "Notification marked as read." });
    } catch (error) {
        next(error);
    }
};


export const getReadNotifications = async (req, res, next) => {
    try {
        const Ddata = await prisma.sfa_push_notification.findMany({where:{del:true},orderBy:{id:'desc'}})
        if (!Ddata) {
            return res.status(402).json({message:"NOT FOUND!"})
        }
         
       return res.status(201).json({ status: true, data: Ddata })
    }
        catch (error) {
        next(error)
    }
}