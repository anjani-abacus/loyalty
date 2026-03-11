import { prisma } from "../config/database.js";
import admin from "./firebase.js";

export const sendNotification = async ({
    title,
    body,
    id,
    type = "both",
    deepLinkPath,
    deepLinkParams = {}
}) => {
    let tokens = [];

    // Get tokens
    if (id) {
        const userTokens = await prisma.influencer_customer.findMany({
            where: { id },
            select: { fcm_token: true },
        });
        tokens = userTokens.map((t) => t.fcm_token).filter(Boolean);
    } else {
        const allTokens = await prisma.influencer_customer.findMany({
            select: { fcm_token: true },
        });
        tokens = allTokens.map((t) => t.fcm_token).filter(Boolean);
    }

    if (tokens.length === 0) {
        console.log("No FCM tokens found, skipping notification.");
        return { success: false, skipped: true };
    }
    // Make a clean payload object
    const payload = {
        title,
        body,
        deepLinkPath,
        deepLinkParams,
        link: `com.basiq360.loyalty.dev:/${deepLinkPath}${deepLinkParams ? "/" + Object.values(deepLinkParams).join("/") : ""}`
    };

    const dataPayload = { payload: JSON.stringify(payload) };

    let message = null;
    if (type === "push") {
        message = { tokens, notification: { title, body }, data: dataPayload };
    } else if (type === "in-app") {
        message = { tokens, data: dataPayload };
    } else if (type === "both") {
        message = { tokens, notification: { title, body }, data: dataPayload };
    }

    return await admin.messaging().sendEachForMulticast(message);
};

// If link is using query style 
// const link = `com.basiq360.loyalty.dev:/${deepLinkPath}${deepLinkParams && Object.keys(deepLinkParams).length > 0
//         ? "?" + new URLSearchParams(deepLinkParams).toString()
//         : ""
//     }`;
// com.basiq360.loyalty.dev:/offers?id=123&type=discount&user=anuj
