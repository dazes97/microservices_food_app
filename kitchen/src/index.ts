import "dotenv/config";
import http from "http";
import { handleOrderRoutes } from "./routes/kitchen.routes.js";
import { redisPublisher, redisSubscriber } from "./redis/redisClient.js";
import { KitchenSubscriberService } from "./services/kitchen.subscriber.js";

const PORT = process.env.SERVER_PORT || 5555;
const MICROSERVICE_NAME = process.env.MICROSERVICE_NAME || "MICROSERVICE_NAME";
const orderSubscriber = new KitchenSubscriberService();
orderSubscriber.subscribeToEvents();

const server = http.createServer((req, res) => {
  if (req.url?.startsWith("/orders")) {
    handleOrderRoutes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});
redisPublisher.connect();
redisSubscriber.connect();
server.listen(PORT, () => {
  console.log(
    `Microservice ${MICROSERVICE_NAME} running on http://localhost:${PORT}`
  );
});
