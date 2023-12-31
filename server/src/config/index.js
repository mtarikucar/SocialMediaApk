export { default as swaggerConfig } from './swagger.config.js'
import { config } from 'dotenv';
config();

const { REDIS_URI, DB_URI, PORT,  BUCKET_NAME } = process.env

export const port = PORT || 3000;
export const dbUri = DB_URI;
export const redisUri = REDIS_URI;
export const bucketName = BUCKET_NAME;
export const prefix = '/api';
export const specs = "/docs";
