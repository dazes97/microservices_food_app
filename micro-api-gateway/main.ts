import "dotenv/config";
import http, { request } from "http";

const PORT = process.env.PORT;
const ORDERS_MICROSERVICE_PORT = process.env.ORDERS_MICROSERVICE_PORT;
const KITCHEN_MICROSERVICE_PORT = process.env.KITCHEN_MICROSERVICE_PORT;
const STORAGE_MICROSERVICE_PORT = process.env.STORAGE_MICROSERVICE_PORT;
const ORDERS_MICROSERVICE_ROUTE = process.env.ORDERS_MICROSERVICE_ROUTE;
const KITCHEN_MICROSERVICE_ROUTE = process.env.KITCHEN_MICROSERVICE_ROUTE;
const STORAGE_MICROSERVICE_ROUTE = process.env.STORAGE_MICROSERVICE_ROUTE;
if (
  !PORT ||
  !ORDERS_MICROSERVICE_PORT ||
  !KITCHEN_MICROSERVICE_PORT ||
  !STORAGE_MICROSERVICE_PORT ||
  !ORDERS_MICROSERVICE_ROUTE ||
  !KITCHEN_MICROSERVICE_ROUTE ||
  !STORAGE_MICROSERVICE_ROUTE
) {
  console.error(
    "Error: Missing environment variables for microservices ports."
  );
  process.exit(1);
}
const services = {
  orders: `http://${ORDERS_MICROSERVICE_ROUTE}:${ORDERS_MICROSERVICE_PORT}`,
  kitchen: `http://${KITCHEN_MICROSERVICE_ROUTE}:${KITCHEN_MICROSERVICE_PORT}`,
  storage: `http://${STORAGE_MICROSERVICE_ROUTE}:${STORAGE_MICROSERVICE_PORT}`,
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url?.startsWith(`/${ORDERS_MICROSERVICE_ROUTE}`)) {
    proxyRequest(req, res, services.orders);
  } else if (req.url?.startsWith(`/${KITCHEN_MICROSERVICE_ROUTE}`)) {
    proxyRequest(req, res, services.kitchen);
  } else if (req.url?.startsWith(`/${STORAGE_MICROSERVICE_ROUTE}`)) {
    proxyRequest(req, res, services.storage);
  } else {
    res.writeHead(418, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: "I'm a teapot, it is a joke! it shoud be 404" })
    );
  }
});

function proxyRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  targetUrl: string
) {
  const url = new URL(req.url || "", targetUrl);

  const options = {
    hostname: url.hostname,
    port: url.port,
    path: url.pathname,
    method: req.method,
    headers: req.headers,
  };

  const proxy = request(options, (proxyRes) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on("error", (error) => {
    console.error(`Error forwarding request to ${targetUrl}:`, error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error forwarding request" }));
  });

  req.pipe(proxy, { end: true });
}

server.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
