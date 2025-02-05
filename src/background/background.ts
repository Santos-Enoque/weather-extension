import { setStoradCities, setStoradOptions } from "../utils/storage";
chrome.runtime.onInstalled.addListener(() => {
  setStoradCities([]);
  setStoradOptions({ temperatureScale: "metric", homeCity: "" });
});

