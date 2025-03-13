import { Box, Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Ingredient {
  name: string;
  quantity: number;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: "Bandeja Paisa",
    ingredients: [
      { name: "lemon", quantity: 2 },
      { name: "potato", quantity: 1 },
      { name: "rice", quantity: 1 },
      { name: "ketchup", quantity: 1 },
      { name: "lettuce", quantity: 1 },
      { name: "onion", quantity: 1 },
      { name: "cheese", quantity: 1 },
      { name: "meat", quantity: 1 },
      { name: "chicken", quantity: 1 },
      { name: "tomato", quantity: 1 },
    ],
  },
  {
    id: 2,
    name: "Ajiaco Santafereno",
    ingredients: [
      { name: "potato", quantity: 3 },
      { name: "chicken", quantity: 1 },
      { name: "onion", quantity: 1 },
      { name: "cheese", quantity: 1 },
      { name: "tomato", quantity: 1 },
    ],
  },
  {
    id: 3,
    name: "Arroz con Pollo Colombiano",
    ingredients: [
      { name: "rice", quantity: 1 },
      { name: "chicken", quantity: 1 },
      { name: "onion", quantity: 1 },
      { name: "tomato", quantity: 2 },
      { name: "lemon", quantity: 1 },
    ],
  },
  {
    id: 4,
    name: "Arepa Rellena de Carne y Queso",
    ingredients: [
      { name: "cheese", quantity: 1 },
      { name: "meat", quantity: 1 },
      { name: "onion", quantity: 1 },
      { name: "ketchup", quantity: 1 },
    ],
  },
  {
    id: 5,
    name: "Papas Criollas con Queso y Ketchup",
    ingredients: [
      { name: "potato", quantity: 2 },
      { name: "cheese", quantity: 1 },
      { name: "ketchup", quantity: 1 },
      { name: "onion", quantity: 1 },
    ],
  },
  {
    id: 6,
    name: "Ensalada Fresca con Pollo y Queso",
    ingredients: [
      { name: "lettuce", quantity: 1 },
      { name: "chicken", quantity: 1 },
      { name: "cheese", quantity: 1 },
      { name: "lemon", quantity: 1 },
      { name: "tomato", quantity: 1 },
    ],
  },
];

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        margin: 2,
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {recipe.name}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {recipe.ingredients.map((ingredient, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                borderRadius: 1,
                padding: "4px 8px",
                whiteSpace: "nowrap",
              }}
            >
              {ingredient.name} ({ingredient.quantity}{" "}
              {ingredient.quantity === 1 ? "unidad" : "unidades"})
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export const RecipeList = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Recetas
      </Typography>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
