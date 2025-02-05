import { OpenWeatherTempScale } from "./api";
export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  homeCity: string;
  temperatureScale: OpenWeatherTempScale;
}
export type LocalStorageKeys = keyof LocalStorage;

export function setStoradCities(cities: string[]): Promise<void> {
  const values: LocalStorage = { cities };
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve();
    });
  });
}

export function getStoradCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      resolve(result.cities || []);
    });
  });
}

export function setStoradOptions(options: LocalStorageOptions): Promise<void> {
  const values: LocalStorage = { options };
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve();
    });
  });
}

export function getStoradOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      resolve(result.options);
    });
  });
}