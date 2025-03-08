import { IncomingMessage, ServerResponse } from "http";
import { OrderController } from "../controllers/kitchen.controller.js";
import { parseBody } from "../utils/parseBody.js";

export async function handleOrderRoutes(
  req: IncomingMessage,
  res: ServerResponse
) {
  const orderController = new OrderController();
  if (req.method === "GET" && req.url === "/orders") {
    return orderController.getOrders(req, res);
  }

  if (
    req.method === "POST" &&
    req.url === "/orders" &&
    req.headers["content-type"] === "application/json"
  ) {
    const body = await parseBody(req);
    return orderController.createOrder(req, res, body);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Not Found" }));
}
