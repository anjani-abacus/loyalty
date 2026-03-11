import { prisma } from "@shared/config/database.js"

export const sendNotificationToUsers = async ({ title, msg,subject, created_by_id, created_by_name, userList = [] }) => {
    if (!title || !msg || !Array.isArray(userList) || userList.length === 0) {
        throw new Error("Missing required data (title, msg, userList)");
    }

    const notification = await prisma.sfa_push_notification.create({
        data: {
            title,
            msg,
            subject,
            ...(image ? { image } : {}),
            created_by_id,
            created_by_name,
        },
    });

    const userNotifications = userList.map((u) => ({
        notification_id: notification.id,
        user_id: Number(u.id),
        user_type: u.type,
    }));

    await prisma.sfa_push_notification_user.createMany({
        data: userNotifications,
    });

    return { notification, totalSent: userNotifications.length };
};



export const getUserNotifications = async (req, res, next) => {
    try {
        const { user_id, user_type, status } = req.query; // status = 'read' | 'unread' | 'all'

        if (!user_id || !user_type) {
            return res.status(400).json({ status: false, message: "User ID and type required." });
        }

        const where = {
            user_id: Number(user_id),
            user_type,
            del: false,
            ...(status === "read" && { is_read: true }),
            ...(status === "unread" && { is_read: false }),
        };

        const notifications = await prisma.sfa_push_notification_user.findMany({
            where,
            include: {
                notification: {
                    select: {
                        id: true,
                        title: true,
                        msg: true,
                        date_created: true,
                        created_by_name: true,
                        image: true,
                    },
                },
            },
            orderBy: { id: "desc" },
        });

        return res.status(200).json({ status: true, data: notifications });
    } catch (error) {
        next(error);
    }
};

export const markNotificationRead = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: false, message: "Notification user ID is required." });
        }

        const updated = await prisma.sfa_push_notification_user.update({
            where: { id: Number(id) },
            data: {
                is_read: true,
                read_at: new Date(),
            },
        });

        return res.status(200).json({ status: true, message: "Notification marked as read.", data: updated });
    } catch (error) {
        next(error);
    }
};


export const markNotificationDelivered = async (req, res, next) => {
    try {
        const { id } = req.body; 

        if (!id) {
            return res.status(400).json({ status: false, message: "Notification user ID is required." });
        }

        const updated = await prisma.sfa_push_notification_user.update({
            where: { id: Number(id) },
            data: {
                delivered: true,
                delivered_at: new Date(),
            },
        });

        return res.status(200).json({ status: true, message: "Notification marked as delivered.", data: updated });
    } catch (error) {
        next(error);
    }
};


export const deleteNotificationUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await prisma.sfa_push_notification_user.update({
            where: { id: Number(id) },
            data: { del: true },
        });

        return res.status(200).json({ status: true, message: "Notification deleted successfully.", data: deleted });
    } catch (error) {
        next(error);
    }
};

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
        const { title, msg, subject } = req.body;
        const image = req.file?.key
            ? `${config.s3.publicUrl}/${req.file.key}`
            : null;
        const notification = await prisma.sfa_push_notification.create({
            data: {
                title,
                subject,
                msg,
                ... (image ? { image } : {}),
                created_by_name: req.user.name,
                created_by_id: req.user.id,
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

