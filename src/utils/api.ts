const OPEN_WEATHER_API_KEY = "bd5e378503939ddaee76f12ad7a97608";
export interface OpenWeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
        id: number;
        main: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
}
export async function fetchOpenWeatherData(city: string) : Promise<OpenWeatherData> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }  
    const data: OpenWeatherData = await response.json();
    return data;
}