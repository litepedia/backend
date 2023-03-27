import { initCache } from "./cache";
import { termWikiHandler } from "./routes";
const express = require("express");
const app = express();


app.get("/term/:title", termWikiHandler);

app.listen(3000, async () => {
  await initCache();
  console.log("Server started on port 3000");
});