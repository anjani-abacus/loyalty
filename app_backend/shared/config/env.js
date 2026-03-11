import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// 1. Load default .env (common)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// 2. Pick env file based on NODE_ENV
const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development";

const envPath = path.resolve(process.cwd(), envFile);

// 3. Load env file if exists
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Loaded environment file: ${envFile}`);
} else {
    console.warn(`⚠️  No ${envFile} found, using default .env only`);
}

// 4. Required variables list
const requiredVars = [
    "DATABASE_URL",
    "BASE_URL",
    "REDIS_URL",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "SMS_GATEWAY_URL",
    "SMS_GATEWAY_USERNAME",
    "SMS_GATEWAY_PASSWORD",
    "SMS_GATEWAY_SENDER_ID",
    "S3_ACCESS_KEY",
    "S3_SECRET_KEY",
    "S3_BUCKET_NAME",
    "S3_ENDPOINT",
    "CORS_ORIGINS"
];

// 5. Validate required variables
const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
    console.error(
        `❌ Missing required environment variables:\n${missingVars.join("\n")}`
    );
    process.exit(1); // Stop the app
}

// 6. Export config
export const config = {
    app: {
        port: process.env.APP_PORT ,
        baseUrl: process.env.BASE_URL,
        nodeEnv: process.env.NODE_ENV,
        CORS_ORIGINS: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [],
    },
    db: {
        url: process.env.DATABASE_URL,
    },
    redis: {
        url: process.env.REDIS_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    sms: {
        enabled: process.env.SMS_GATEWAY,
        url: process.env.SMS_GATEWAY_URL,
        username: process.env.SMS_GATEWAY_USERNAME,
        password: process.env.SMS_GATEWAY_PASSWORD,
        senderId: process.env.SMS_GATEWAY_SENDER_ID,
    },
    s3: {
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        bucketName: process.env.S3_BUCKET_NAME,
        endpoint: process.env.S3_ENDPOINT,
        publicUrl: process.env.S3_PUBLIC_URL,
    },
};
