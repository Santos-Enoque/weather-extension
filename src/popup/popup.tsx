import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles/global.css";
import "./popup.css";
import { WeatherCard } from "./WeatherCard";
import { InputBase, IconButton, Paper } from "@mui/material";
import { Plus } from "lucide-react";
import { getStoradCities, setStoradCities } from "../utils/storage";

const App = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");

  useEffect(() => {
    getStoradCities().then((cities) => {
      setCities(cities);
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

  return (
    <div className="w-[320px] h-[512px] flex flex-col gap-4 bg-gray-100 p-4 rounded-md">
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
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {cities.map((city, index) => (
            <WeatherCard
              key={index}
              city={city}
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
