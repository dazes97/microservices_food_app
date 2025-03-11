import "dotenv/config";
import { RecipeRepository } from "@infrastructure/persistence/RecipeRepository.js";
import { KitchenPublisher } from "@infrastructure/transporter/KitchenPublisher.js";
import { OrderSubscriber } from "./infrastructure/transporter/OrderSubscriber.js";
import { ProcessRecipe } from "@application/ProcessRecipe.js";
import { MySqlAdapter } from "@infrastructure/database/MySql.js";
import { Redis } from "@infrastructure/transporter/Redis.js";

const TRANSPORTER_PORT = process.env.TRANSPORTER_PORT || "6379";
const TRANSPORTER_HOST = process.env.TRANSPORTER_HOST || "localhost";
const MICROSERVICE_NAME = process.env.MICROSERVICE_NAME || "MICROSERVICE_NAME";
(async () => {
  const transporter = new Redis(TRANSPORTER_PORT, TRANSPORTER_HOST);
  await transporter.connect();
  const dbAdapter = new MySqlAdapter();
  const recipeRepository = new RecipeRepository(dbAdapter);
  const kitchenPublisher = new KitchenPublisher(transporter);
  const processRecipe = new ProcessRecipe(recipeRepository, kitchenPublisher);
  const kitchenSubscriber = new OrderSubscriber(transporter, processRecipe);
  kitchenSubscriber.subscribeToEvents();
  console.log(
    `${MICROSERVICE_NAME} Microservice iniciado y escuchando recetas...`
  );
})();
