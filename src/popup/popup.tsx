import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles/global.css";
import "./popup.css";
import { WeatherCard } from "./WeatherCard";
import { InputBase, IconButton, Paper, Switch } from "@mui/material";
import { Plus } from "lucide-react";
import {
  getStoradCities,
  LocalStorageOptions,
  setStoradCities,
  getStoradOptions,
  setStoradOptions,
} from "../utils/storage";

const App = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoradCities().then((cities) => {
      setCities(cities);
    });
    getStoradOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleAddCity = () => {
    if (cityInput.trim() === "") return;
    const newCities = [cityInput, ...cities];
    setStoradCities(newCities).then(() => {
      setCities(newCities);
      setCityInput("");
    });
  };

  const handleDeleteCity = (index: number) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setStoradCities(newCities).then(() => {
      setCities(newCities);
    });
  };

  const handleToggleTemperatureUnit = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      temperatureScale:
        options.temperatureScale === "imperial" ? "metric" : "imperial",
    };
    setStoradOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  if (!options) return null;

  return (
    <div className="w-[320px] h-[512px] flex flex-col gap-4 bg-gray-100 p-4 rounded-md">
      <div className="flex flex-row gap-2">
        <Paper className="flex flex-row gap-2 px-4 py-2">
          <InputBase
            className="flex-grow"
            placeholder="Add a city"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddCity();
              }
            }}
          />
          <IconButton onClick={handleAddCity}>
            <Plus />
          </IconButton>
        </Paper>
        <Paper>
          <IconButton onClick={handleToggleTemperatureUnit}>
            {options.temperatureScale === "imperial" ? "\u2103" : "\u2109"}
          </IconButton>
        </Paper>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {options.homeCity && (
            <WeatherCard
              city={options.homeCity}
              tempScale={options.temperatureScale}
            />
          )}
          {cities.map((city, index) => (
            <WeatherCard
              key={index}
              city={city}
              tempScale={options.temperatureScale}
              onDelete={() => handleDeleteCity(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
