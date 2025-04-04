import http, { IncomingMessage, ServerResponse } from "http";
import { ProcessOrdersList } from "@/application/ProcessOrdersDetails.js";
import { ProcessOrderDetail } from "@/application/processOrderDetail";
import { HTTP_METHOD_LIST } from "@infrastructure/config/HttpMethodList.js";
import { HTTP_ROUTE_LIST } from "@infrastructure/config/HttpRouteList.js";
import { ProcessOrder } from "@/application/ProcessOrder.js";

export class HttpServer {
  constructor(
    private processOrder: ProcessOrder,
    private processOrderDetail: ProcessOrderDetail,
    private processOrdersList: ProcessOrdersList
  ) {}

  start(port: number) {
    const server = http.createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        if (
          req.method === HTTP_METHOD_LIST.POST &&
          req.url === HTTP_ROUTE_LIST.CREATE
        ) {
          await this.handleOrder(req, res);
        } else if (
          req.method === HTTP_METHOD_LIST.GET &&
          req.url?.match(/^\/orders\/\d+$/)
        ) {
          await this.handleOrderDetail(req, res);
        } else if (
          req.method === HTTP_METHOD_LIST.GET &&
          req.url === HTTP_ROUTE_LIST.FIND_ALL
        ) {
          await this.handleOrdersList(req, res);
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Not Found" }));
        }
      }
    );

    server.listen(port, () => {
      console.log(`HTTP Server running on port ${port}`);
    });
  }

  private async handleOrder(req: IncomingMessage, res: ServerResponse) {
    try {
      await this.processOrder.execute();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "success", data: [], message: "" }));
    } catch (error) {
      console.error("Error processing request:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Internal Server Error", status: "error" })
      );
    }
  }

  private async handleOrderDetail(req: IncomingMessage, res: ServerResponse) {
    try {
      const urlParts = req.url?.split("/orders/") || [];
      if (urlParts.length > 1 && urlParts[1]) {
        const orderId = Number(urlParts[1]);
        if (!isNaN(orderId)) {
          const response = await this.processOrderDetail.execute(orderId);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ status: "success", data: [response], message: "" })
          );
        } else {
          throw new Error("Invalid orderId");
        }
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Internal Server Error", status: "error" })
      );
    }
  }

  private async handleOrdersList(req: IncomingMessage, res: ServerResponse) {
    try {
      const response = await this.processOrdersList.execute();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: "success", data: response, message: "" })
      );
    } catch (error) {
      console.error("Error processing request:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Internal Server Error", status: "error" })
      );
    }
  }
}
