import axios from "axios";
import {load} from "cheerio";
import { getCachedContent } from "./cache";

export async function fetchWikipediaContent(title: string): Promise<string> {
    const cachedContent = await getCachedContent(title);
    if (cachedContent) {
        return cachedContent;
    }
  const url = `https://en.wikipedia.org/wiki/${title}`;
  console.log(`fetching ${url}`);

  try {
    const response = await axios.get(url);
    const $ = load(response.data);
    const paragraphs = $("p").toArray().slice(0, 10);

    const minifiedContent = paragraphs
      .map((paragraph: any) => $(paragraph).text().trim())
      .join(" ");

    return minifiedContent;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while scraping the content.");
  }
}
