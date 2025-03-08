import { IncomingMessage } from "http";

export function parseBody(req: IncomingMessage): Promise<Object> {
  return new Promise((resolve, reject) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        if (body) {
          resolve(JSON.parse(body));
        } else {
          resolve({});
        }
      } catch (error) {
        reject(new Error("Invalid JSON input"));
      }
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
}
