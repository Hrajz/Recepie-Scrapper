# Recipe Finder

Recipe Finder is a web application that allows users to search for recipes based on the ingredients they have. It fetches real-time recipe data from popular cooking websites using web scraping and displays relevant recipes with titles, descriptions, and images.

## Features

- **Ingredient-Based Search**: Users can input ingredients they have, and the app will show relevant recipes.
- **Web Scraping**: The app uses web scraping to fetch recipes from popular websites.
- **Recipe Details**: Each recipe title links to a detailed view that shows the full content scraped from the original source.
- **Responsive Design**: The app is designed to be fully responsive for mobile and desktop.
- **Vercel Hosting**: The app is deployed on Vercel for easy access.

## Demo

Check out the live demo of the app here: [Recipe Finder](https://recepie-finder-iu05g6efn-hrajzs-projects.vercel.app)

## Technologies Used

- **Node.js**: Backend server.
- **Express.js**: Web framework for Node.js.
- **EJS**: Template engine for rendering HTML.
- **Web Scraping**: Cherrio to fetch recipes from third-party sites.
- **CSS**: Custom styling for the app.
- **Vercel**: Deployment platform.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-finder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd recipe-finder
   ```
3. Install the dependencies:
   ```bash
   yarn install
   ```
4. Start the server:
   ```bash
   yarn start
   ```
5. Open your browser and go to `http://localhost:3000`.

## Project Structure

```
.
├── public/             # Static assets (CSS, images, etc.)
├── views/              # EJS templates
├── scrapper.js         # Web scraping logic
├── app.js              # Main server file
├── package.json        # Project configuration and dependencies
└── README.md           # This file
```

## How It Works

1. Users enter ingredients in the search bar.
2. The app sends a request to scrape recipes that match those ingredients from a third-party site.
3. The app displays the recipes with images, descriptions, and links to full details.
4. Clicking on a recipe title opens a new page with the full recipe details scraped from the source.

## Contributing

Feel free to submit pull requests for any improvements or new features. All contributions are welcome!
