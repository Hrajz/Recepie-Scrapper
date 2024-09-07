const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function scrapeAllRecipes(ingredients) {
  const baseUrl = "https://www.allrecipes.com/search?q=";
  const query = ingredients.split(",").join("%2C");
  const url = `${baseUrl}${query}`;
  console.log("AllRecipes URL:", url);

  try {
    const response = await axios.get(url);
    console.log("AllRecipes Response Status:", response.status);
    console.log("AllRecipes Response Data Length:", response.data.length);
    const $ = cheerio.load(response.data);
    const htmlContent = $.html();
    fs.writeFileSync("all.html", htmlContent);
    // console.log("AllRecipes Loaded HTML:", $.html());

    const recipes = [];
    $(".card__detailsContainer-left").each((i, element) => {
      const title = $(element).find(".card__title").text().trim();
      const link = $(element).parent().attr("href");
      // console.log("Recipe Title:", title, "Link:", link);
      recipes.push({
        title,
        link,
      });
    });

    return recipes;
  } catch (error) {
    console.error("Error scraping AllRecipes:", error);
    return [];
  }
}

async function scrapeEpicurious(ingredients) {
  const baseUrl = "https://www.vegrecipesofindia.com/?s=";
  const query = ingredients.split(",").join("%2C");
  const url = `${baseUrl}${query}`;
  console.log("Indian URL:", url);

  try {
    const response = await axios.get(url);
    console.log("Indian Response Status:", response.status);
    console.log("Indian Response Data Length:", response.data.length);
    const $ = cheerio.load(response.data);
    const htmlContent = $.html();
    // fs.writeFileSync("india.html", htmlContent);
    // console.log("Epicurious Loaded HTML:", $.html());

  const recipes = [];

  $(".search-result").each((i, element) => {
    recipes.push({
      title: $(element).find("h2.post-summary__title a").text(), // Extracting the recipe title
      link: $(element).find("h2.post-summary__title a").attr("href"), // Extracting the recipe link
      image: $(element).find("a.post-summary__image img").attr("src"), // Extracting the image URL
      description: $(element).find(".post-summary__content p").first().text(), // Extracting the description
      updated: $(element).find(".post-summary__updated").text(), // Extracting the "Last updated" text
    });
  });
    console.log("hiiiiiii",recipes)
    return recipes;
  } catch (error) {
    console.error("Error scraping Epicurious:", error);
    return [];
  }
}

async function scrapeRecipes(ingredients) {
  try {
    const allRecipes = await scrapeAllRecipes(ingredients);
    const epicuriousRecipes = await scrapeEpicurious(ingredients);
    return [...allRecipes, ...epicuriousRecipes];
  } catch (error) {
    console.error("Error scraping recipes:", error);
    return [];
  }
}

// Top-level execution
(async () => {
  try {
    const recipes = await scrapeRecipes("tomato,onion");
    console.log("Recipes:", recipes);
  } catch (error) {
    console.error("Top-level Error:", error);
  }
})();

module.exports = { scrapeRecipes };
