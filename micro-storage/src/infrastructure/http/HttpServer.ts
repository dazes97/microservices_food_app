import http, { IncomingMessage, ServerResponse } from "http";
import { ProcessStockPlaza } from "@application/processStockPlaza.js";
import { ProcessStockInfo } from "@application/ProcessStockInfo.js";
import { HTTP_METHOD_LIST } from "@infrastructure/config/HttpMethodList.js";
import { HTTP_ROUTE_LIST } from "@infrastructure/config/HttpRouteList.js";

export class HttpServer {
  constructor(
    private processStockInfo: ProcessStockInfo,
    private processStockPlaza: ProcessStockPlaza
  ) {}

  start(port: number) {
    const server = http.createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        if (
          req.method === HTTP_METHOD_LIST.GET &&
          req.url === HTTP_ROUTE_LIST.GET_STOCK
        ) {
          await this.handleStockInfo(req, res);
        } else if (
          req.method === HTTP_METHOD_LIST.GET &&
          req.url === HTTP_ROUTE_LIST.GET_PLAZA
        ) {
          await this.handleStockPlaza(req, res);
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

  private async handleStockInfo(req: IncomingMessage, res: ServerResponse) {
    try {
      const response = await this.processStockInfo.execute();
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

  private async handleStockPlaza(req: IncomingMessage, res: ServerResponse) {
    try {
      const response = await this.processStockPlaza.execute();
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
