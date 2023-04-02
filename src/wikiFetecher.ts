import axios from "axios";
import {load} from "cheerio";
import { getCachedContent, setCachedContent } from "./cache";

export async function fetchWikipediaContent(title: string): Promise<string> {
    //@ts-ignore
    title = title.replaceAll(' ', '_');
    const cachedContent = await getCachedContent(`wiki:${title}`);
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

    await setCachedContent(`wiki:${title}`, minifiedContent);
    return minifiedContent;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while scraping the content.");
  }
}
