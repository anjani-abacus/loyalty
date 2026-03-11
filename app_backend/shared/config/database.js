import { PrismaClient } from '@prisma/client';
import { config } from './env.js';
import logger from '../utilities/logger.js';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.db.url,
    },
  },
}).$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const start = Date.now();
        const result = await query(args);
        const end = Date.now();

        logger.info(`[${model}.${operation}] took ${end - start}ms`);
        return result;
      },
    },
  }
  
});


const start = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected and Prisma client is running.');
    process.stdin.resume();

  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  }
};

start();


export { prisma};