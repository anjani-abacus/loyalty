import prisma from "@shared/dbConfig/database.js";


export const getAllTickets = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req?.body || {};
        const skip = (page - 1) * limit;
        const take = parseInt(limit);
        const data = await prisma.tickets.findMany({
            orderBy: { date_created: 'desc' },
            skip: skip,
            take: take,
        })
        const count = await prisma.tickets.count({ where: { del: false } });
        return res.status(200).json({ message: 'Successfully fetched all tickets', count: count, data: data });
    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error)
    }
}

export const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ticket_status, close_remark } = req.body;

        const ticket = await prisma.tickets.update({
            where: { id: Number(id) },
            data: { ticket_status: ticket_status, ...(close_remark ? { close_remark } : {}), close_date: new Date(), closed_by_id: req.user.id, closed_by_name: req.user.name },
        });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Status updated successfully', ticket });

    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error)

    }
}