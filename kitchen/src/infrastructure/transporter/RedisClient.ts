import { createClient } from "redis";

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";

const redisPublisher = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
const redisSubscriber = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisPublisher
  .on("connect", () => console.log("REDIS Publisher Connected"))
  .on("error", (err) => {
    console.error("REDIS Publisher Error: ", err);
    process.exit(1);
  });

redisSubscriber
  .on("connect", () => console.log("REDIS Subscriber Connected"))
  .on("error", (err) => {
    console.error("REDIS Subscriber Error: ", err);
    process.exit(1);
  });

async function connect() {
  try {
    await redisPublisher.connect();
    await redisSubscriber.connect();
  } catch (err) {
    console.error("Redis Connect  Error: ", err);
    process.exit(1);
  }
}

connect();

export { redisPublisher, redisSubscriber };
