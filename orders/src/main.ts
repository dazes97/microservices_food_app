import "dotenv/config";
import { ProcessOrderDetail } from "./application/processOrderDetail.js";
import { OrderRepository } from "@infrastructure/persistence/OrderRepository.js";
import { OrderPublisher } from "@infrastructure/transporter/OrderPublisher.js";
import { MySqlAdapter } from "@infrastructure/database/MySql.js";
import { ProcessOrder } from "@application/ProcessOrder.js";
import { HttpServer } from "@infrastructure/http/HttpServer.js";
import { Redis } from "@infrastructure/transporter/Redis.js";

const SERVER_PORT = process.env.PORT ? Number(process.env.SERVER_PORT) : 3000;
const TRANSPORTER_PORT = process.env.TRANSPORTER_PORT || "6379";
const TRANSPORTER_HOST = process.env.TRANSPORTER_HOST || "localhost";
const MICROSERVICE_NAME = process.env.MICROSERVICE_NAME || "MICROSERVICE_NAME";
(async () => {
  const transporter = new Redis(TRANSPORTER_PORT, TRANSPORTER_HOST);
  await transporter.connect();
  const dbAdapter = new MySqlAdapter();
  const orderPublisher = new OrderPublisher(transporter);
  const orderRepository = new OrderRepository(dbAdapter);
  const processOrder = new ProcessOrder(orderRepository, orderPublisher);
  const processOrderDetail = new ProcessOrderDetail(orderRepository);
  const httpServer = new HttpServer(processOrder, processOrderDetail);
  httpServer.start(SERVER_PORT);

  console.log(
    `${MICROSERVICE_NAME} Microservice iniciado y escuchando recetas...`
  );
})();
