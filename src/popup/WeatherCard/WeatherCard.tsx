import React, { useEffect, useState } from "react";
import { fetchOpenWeatherData, OpenWeatherData } from "../../utils/api";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { Loader2, Trash } from "lucide-react";

const WeatherCardContainer = ({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete?: () => void;
}) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      {onDelete && (
        <CardActions>
          <IconButton onClick={onDelete} size="small">
            <Trash size={16} /> <span className="ml-2">Delete</span>
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

type WeatherCardState = "loading" | "error" | "success";

const WeatherCard = ({
  city,
  onDelete,
}: {
  city: string;
  onDelete?: () => void;
}) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [weatherCardState, setWeatherCardState] =
    useState<WeatherCardState>("loading");
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data);
        setWeatherCardState("success");
      })
      .catch((error) => {
        setWeatherCardState("error");
      });
  }, [city]);
  if (weatherCardState === "loading")
    return (
      <WeatherCardContainer>
        <Typography variant="body1">
          {" "}
          <Loader2 className="animate-spin" /> Loading...
        </Typography>
      </WeatherCardContainer>
    );

  if (weatherCardState === "error")
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1" className="text-red-500">
          Error fetching weather data
        </Typography>
      </WeatherCardContainer>
    );

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5">{city}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData.main.temp)}°C
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}°C
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
