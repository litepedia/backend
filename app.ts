const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");


const { callGpt } = require("./api")

const app = express();

app.get("/scrape/:title", async (req: any, res: any) => {
  const { title } = req.params;
  const url = `https://en.wikipedia.org/wiki/${title}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const paragraphs = $("p").toArray().slice(0, 6);

    const minifiedContent = paragraphs
      .map((paragraph: any) => $(paragraph).text().trim())
      .join(" ");

    console.log(`call gpt`);
    
    const gptResponse = await callGpt(minifiedContent);
    const prettyTitle = title.replaceAll('_', ' ');

    console.log(`end gpt`, gptResponse.content);
    // Build the HTML response
    const htmlResponse = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - Minified Content</title>
        <style>
          body { max-width:640px; font-family:arial;}
        </style>
      </head>
      <body>
        <h1>${prettyTitle}</h1>
        <p>${gptResponse.content}</p>
      </body>
      </html>
    `;

    res.send(htmlResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>An error occurred while scraping the content.</h1>");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
