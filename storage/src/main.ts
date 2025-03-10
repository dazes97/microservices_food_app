import "dotenv/config";
import { KitchenSubscriber } from "@/infrastructure/transporter/KitchenSubscriber.js";
import { IngredientRepository } from "@infrastructure/persistence/IngredientRepository.js";
import { ProcessStockInfo } from "@application/ProcessStockInfo.js";
import { StoragePublisher } from "@infrastructure/transporter/StoragePublisher.js";
import { ProcessRecipe } from "@application/ProcessRecipe.js";
import { MySqlAdapter } from "@infrastructure/database/MySql.js";
import { PlazaClient } from "@infrastructure/http/PlazaClient.js";
import { HttpServer } from "@infrastructure/http/HttpServer.js";
import { Redis } from "@infrastructure/transporter/Redis.js";

const MICROSERVICE_NAME = process.env.MICROSERVICE_NAME || "MICROSERVICE_NAME";
const SERVER_PORT = process.env.PORT ? Number(process.env.SERVER_PORT) : 3000;
const TRANSPORTER_PORT = process.env.TRANSPORTER_PORT || "6379";
const TRANSPORTER_HOST = process.env.TRANSPORTER_HOST || "localhost";
(async () => {
  const transporter = new Redis(TRANSPORTER_PORT, TRANSPORTER_HOST);
  await transporter.connect();
  const dbAdapter = new MySqlAdapter();
  const plazaClient = new PlazaClient();
  const ingredientRepository = new IngredientRepository(dbAdapter);
  const storagePublisher = new StoragePublisher(transporter);
  const processRecipe = new ProcessRecipe(
    ingredientRepository,
    plazaClient,
    storagePublisher,
    dbAdapter
  );
  const kitchenSubscriber = new KitchenSubscriber(transporter, processRecipe);
  const processStockInfo = new ProcessStockInfo(ingredientRepository);
  const httpServer = new HttpServer(processStockInfo);

  kitchenSubscriber.subscribeToKitchenEvents();
  httpServer.start(SERVER_PORT);

  console.log(
    `🚀 ${MICROSERVICE_NAME} Microservice iniciado y escuchando recetas...`
  );
})();
