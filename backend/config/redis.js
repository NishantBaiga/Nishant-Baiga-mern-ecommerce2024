import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = new Redis(process.env.UPSTASH_REDIS_REST_URL, {
  enableAutoPipelining: true,
  showFriendlyErrorStack: true,
  lazyConnect: false,
  reconnectOnError: (err) => {
    console.error("Reconnect on error:", err);
    return true; // Always attempt to reconnect
  },
});

redisClient.on("connect", () => {
  console.log("Redis Client Connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
  process.exit(1);
});

redisClient.on("ready", () => {
  console.log("Redis Client is ready!");
});

// redisClient
//     .set("testKey", "testValue")
//     .then(() => redisClient.get("testKey"))
//     .then((result) => console.log("Test key value:", result))
//     .catch((err) => console.error("Error during Redis operations:", err));
export default redisClient;
