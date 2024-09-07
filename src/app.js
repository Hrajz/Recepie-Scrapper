const express = require("express");
const path = require("path");
const app = express();
const scraper = require("./scrapper");

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (e.g., CSS)
app.use(express.static(path.join(__dirname, "public")));

// Route to render the search page
app.get("/", (req, res) => {
  res.render("index");
});

// Route to handle search and display results
app.get("/results", async (req, res) => {
  const ingredients = req.query.ingredients || ""; // Default to empty string if not provided

  if (!ingredients) {
    return res.render("results", { recipes: [], ingredients }); // Render empty results initially
  }

  try {
    const recipes = await scraper.scrapeRecipes(ingredients);
    console.log("Fetched Recipes:", recipes); // Debug fetched recipes
    res.render("results", { recipes, ingredients });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
