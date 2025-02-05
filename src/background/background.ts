import { setStoradCities } from "../utils/storage";
chrome.runtime.onInstalled.addListener(() => {
  setStoradCities([]);
});

