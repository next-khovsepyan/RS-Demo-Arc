import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3400;
export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/realshot";
export const SALVADOR_MEDIA_BASE_URL = process.env.SALVADOR_MEDIA_BASE_URL;
export const CURRENT_AI_CLIP_MODEL = process.env.CURRENT_AI_CLIP_MODEL;
export const CURRENT_AI_CLIP_DIMS = process.env.CURRENT_AI_CLIP_DIMS;
export const AMQP_CONNECTION_STRING = process.env.AMQP_CONNECTION_STRING || "amqp://localhost:5672";
export const MAX_EVENT_LISTENERS = process.env.MAX_EVENT_LISTENERS;
export const ELASTIC_BUCKET =  process.env.ELASTIC_BUCKET || "example";
export const ELASTIC_URL = process.env.ELASTIC_URL;
export const ELASTIC_URSERNAME = process.env.ELASTIC_URSERNAME;
export const ELASTIC_PASSWORD = process.env.ELASTIC_PASSWORD;
export const MILVUS_URL = process.env.MILVUS_URL;
export const MILVUS_COLLECTION_NAME = process.env.MILVUS_COLLECTION_NAME;
export const SOCKET_DATA_FOLDER = process.env.SOCKET_DATA_FOLDER;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = 6379;

export const DEFAULT_PAGE_LIMIT = 10;
export const DEFAULT_PAGE = 1;
export const MAX_SEARCH_ATTEMPTS = 70;
export const THRESHOLD = 0.8;
export const MIN_PROCESS_ITEMS = 3;
export const BAD_VECTORS_BUCKET = process.env.BAD_VECTORS_BUCKET;

export const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};