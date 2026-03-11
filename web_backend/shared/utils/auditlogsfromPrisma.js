import prisma from "@shared/dbConfig/database.js";


export const getAuditLogs = async ({
    table_name,
    record_id,
} = {}) => {
    try {
        const logs = await prisma.audit_log.findMany({
            where: {
                ...(table_name && { table_name }),
                ...(record_id && { record_id: Number(record_id) }),
            },
            omit: {
                old_data: true,
                new_data: true
            },
            orderBy: {
                timestamp: "desc"
            }
        });

        return logs;
    } catch (error) {
        console.error("Error fetching audit logs:", error);
        throw new Error("Could not fetch logs");
    }
};
