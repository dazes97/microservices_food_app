// import http, { IncomingMessage, ServerResponse } from "http";
// import { HTTP_METHOD_LIST } from "@infrastructure/config/HttpMethodList.js";
// import { HTTP_ROUTE_LIST } from "@infrastructure/config/HttpRouteList.js";
// import { ProcessOrder } from "@/application/ProcessRecipe.js";

// export class HttpServer {
  // constructor(
  //   private processOrder: ProcessOrder,
  //   private processOrderDetail: ProcessOrderDetail
  // ) {}

  // start(port: number) {
  //   const server = http.createServer(
  //     async (req: IncomingMessage, res: ServerResponse) => {
  //       if (
  //         req.method === HTTP_METHOD_LIST.POST &&
  //         req.url === HTTP_ROUTE_LIST.CREATE
  //       ) {
  //         await this.handleOrder(req, res);
  //       } else if (
  //         req.method === HTTP_METHOD_LIST.GET &&
  //         req.url?.match(/^\/\d+$/)
  //       ) {
  //         await this.handleOrderDetail(req, res);
  //       } else {
  //         res.writeHead(404, { "Content-Type": "application/json" });
  //         res.end(JSON.stringify({ message: "Not Found" }));
  //       }
  //     }
  //   );

  //   server.listen(port, () => {
  //     console.log(`HTTP Server running on port ${port}`);
  //   });
  // }

  // private async handleOrder(req: IncomingMessage, res: ServerResponse) {
  //   try {
  //     await this.processOrder.execute();
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify({ status: "success", data: [], message: "" }));
  //   } catch (error) {
  //     console.error("Error processing request:", error);
  //     res.writeHead(500, { "Content-Type": "application/json" });
  //     res.end(
  //       JSON.stringify({ message: "Internal Server Error", status: "error" })
  //     );
  //   }
  // }

  // private async handleOrderDetail(req: IncomingMessage, res: ServerResponse) {
  //   try {
  //     const urlParts = req.url?.split("/") || [];
  //     if (urlParts.length > 1 && urlParts[1]) {
  //       const orderId = Number(urlParts[1]);
  //       if (!isNaN(orderId)) {
  //         const response = await this.processOrderDetail.execute(orderId);
  //         res.writeHead(200, { "Content-Type": "application/json" });
  //         res.end(
  //           JSON.stringify({ status: "success", data: [response], message: "" })
  //         );
  //       } else {
  //         throw new Error("Invalid orderId");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error processing request:", error);
  //     res.writeHead(500, { "Content-Type": "application/json" });
  //     res.end(
  //       JSON.stringify({ message: "Internal Server Error", status: "error" })
  //     );
  //   }
  // }
// }
