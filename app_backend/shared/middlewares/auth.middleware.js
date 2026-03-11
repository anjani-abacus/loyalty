import jwt from "jsonwebtoken";
import {config} from '../config/env.js'
import redisClient from "../config/redis.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt.secret, { algorithms: ["HS256"] });
    if (!decoded)
      return res.status(401).json({ success: false, message: "Invalid token" });

    const storedToken = await redisClient.get(`user:${decoded.id}:accessToken`);
    if (!storedToken || storedToken !== token) {
      return res.status(401).json({ success: false, deactivated: true, message: "You'r account has been deactivated, contact to admin!" });
    }
   
    req.user = decoded;
    next();
  } catch (err) {
    console.error("VerifyToken Error:", err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
