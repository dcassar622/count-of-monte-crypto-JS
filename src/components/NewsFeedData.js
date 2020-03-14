import { displayNewsFeed } from "./NewsFeedDisplay.js";

export async function setupNewsFeed() {
  let dataAPI = await fetch(
    "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
  );
  let dataJSON = await dataAPI.json();
  let newsFeedItems = dataJSON.Data;

  displayNewsFeed(newsFeedItems);
}
