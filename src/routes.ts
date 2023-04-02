import { callGpt } from "./api";
import { initCache } from "./cache";
import { capitalizeFirstLetter } from "./utils";
import { fetchWikipediaContent } from "./wikiFetecher";
import fs from "fs";
const axios = require("axios");
const cheerio = require("cheerio");


export async function termWikiHandler(req: any, res: any) {
  await initCache();
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }


  let title = req.params[0] || req.params.term;
  if (!title) {
    res.send({});
  }
  
  title = title.replaceAll(' ', '_').toLowerCase();
  const wikiContent = await fetchWikipediaContent(title);
  let gptResponse = await callGpt(title, wikiContent);
  res.json({
    title: capitalizeFirstLetter(title.replaceAll('_', ' ')),
    content: capitalizeFirstLetter(gptResponse as string),
  })
}

export async function termWikiHandlerHTML(req: any, res: any) {
  await initCache();
  // support express routing as well
  let title = req.params[0] || req.params.term;
  if (!title) {
    return res.send(homeRoute());
  }
  try {
    const wikiContent = await fetchWikipediaContent(title);
    let gptResponse = await callGpt(title, wikiContent);
    const prettyTitle = capitalizeFirstLetter(title.replaceAll('_', ' '));
    gptResponse = capitalizeFirstLetter(gptResponse as string);

    // Build the HTML response
    const htmlResponse = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fish - Litepedia</title>
        <style>
          body {
            font-family: 'Segoe UI', 'Arial', sans-serif;
            max-width: 960px;
            margin: 0 auto;
            font-size: 14px;
            line-height: 1.6;
            color: #222;
            background-color: #fff;
            padding: 1em;
          }

          h1 {
            font-size: 32px;
            font-weight: normal;
            margin-bottom: 0.5em;
            border-bottom: 1px solid #a2a9b1;
            padding-bottom: 0.5em;
          }

          p {
            margin: 0 0 1em;
            text-align: justify;
          }

          a, a:visited {
            color: #0645ad;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            padding: 1em 0;
          }

          .footer {
            font-size: 12px;
            text-align: center;
            padding: 1em 0;
            border-top: 1px solid #a2a9b1;
            margin-top: 1em;
          }
        </style>
      </head>
      <body>
        <div class="logo">litepedia</div>
        <h1>${prettyTitle}</h1>
        <p>${gptResponse}</p>
      </body>
      </html>
    `;

    res.send(htmlResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>An error occurred while scraping the content.</h1>");
  }
}

function homeRoute() {
  return fs.readFileSync('./wiki-ac.html', 'utf8')
}