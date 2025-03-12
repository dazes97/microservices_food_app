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
  orders: `http://localhost:${ORDERS_MICROSERVICE_PORT}`,
  kitchen: `http://localhost:${KITCHEN_MICROSERVICE_PORT}`,
  storage: `http://localhost:${STORAGE_MICROSERVICE_PORT}`,
};

const server = http.createServer((req, res) => {
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
  const options = {
    hostname: new URL(targetUrl).hostname,
    port: new URL(targetUrl).port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });
}

server.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
