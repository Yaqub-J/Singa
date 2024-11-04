// import { loadEnv, defineConfig } from '@medusajs/framework/utils'

// loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     http: {
//       storeCors: process.env.STORE_CORS!,
//       adminCors: process.env.ADMIN_CORS!,
//       authCors: process.env.AUTH_CORS!,
//       jwtSecret: process.env.JWT_SECRET || "supersecret",
//       cookieSecret: process.env.COOKIE_SECRET || "supersecret",
//     }
//   }
// })

// medusa-config.js
const dotenv = require('dotenv');

try {
  dotenv.config();
} catch (e) {}

// CORS configurations
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000";

// Database URL - handled by Render
const DATABASE_URL = process.env.DATABASE_URL;

// Redis URL - handled by Render
const REDIS_URL = process.env.REDIS_URL;

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_type: "postgres",
    database_url: DATABASE_URL,
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra: { 
      ssl: { rejectUnauthorized: false }
    }
  },
  plugins: [
    `medusa-fulfillment-manual`,
    `medusa-payment-manual`,
    {
      resolve: `@medusajs/file-local`,
      options: {
        upload_dir: "uploads"
      },
    }
  ],
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: REDIS_URL
      }
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: REDIS_URL
      }
    }
  }
};