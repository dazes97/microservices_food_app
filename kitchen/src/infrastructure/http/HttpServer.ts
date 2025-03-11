import http, { IncomingMessage, ServerResponse } from "http";
import { ProcessStockInfo } from "@application/ProcessStockInfo.js";
import { HTTP_METHOD_LIST } from "@infrastructure/config/HttpMethodList.js";
import { HTTP_ROUTE_LIST } from "@infrastructure/config/HttpRouteList.js";

export class HttpServer {
  constructor(private processStockInfo: ProcessStockInfo) {}

  start(port: number) {
    const server = http.createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        if (
          req.method === HTTP_METHOD_LIST.GET &&
          req.url === HTTP_ROUTE_LIST.GET_STOCK
        ) {
          await this.handleStockInfo(req, res);
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
      // const body = await this.parseBody(req);
      //   if (!body.orderId || !body.recipeId || !body.ingredients) {
      //     res.writeHead(400, { "Content-Type": "application/json" });
      //     res.end(JSON.stringify({ error: "Invalid request payload" }));
      //     return;
      //   }
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

  private parseBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
