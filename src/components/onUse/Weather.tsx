"use client";
import { ThermometerSun, CloudSun, Sun, Cloud, Moon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  fetchWeatherDataByCity,
  fetchWeatherDataByCoords,
} from "@/lib/weatherApi";
import { WeatherLoadingSkeleton } from "../skeletons/WeatherSkeleton";

interface WeatherProps {
  city: string;
  defaultCity?: string;
}

const getIconForFeelsLike = (temp: number) => {
  if (temp <= 10) return <Cloud height={14} />;
  if (temp <= 20) return <CloudSun height={14} />;
  if (temp <= 30) return <Sun height={14} />;
  return <Moon height={14} />;
};

const Weather: React.FC<WeatherProps> = ({
  city,
  defaultCity = "Biratnagar",
}) => {
  const [weather, setWeather] = useState<any>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherAndUpdate = async (cityName: string) => {
      const weatherData = await fetchWeatherDataByCity(cityName);
      if (weatherData) {
        setWeather(weatherData);
        setLocationError(null);
      } else {
        setWeather(null);
        setLocationError("Failed to fetch weather data.");
      }
    };

    const fetchWeatherAndUpdateByCoords = async (lat: number, lon: number) => {
      const weatherData = await fetchWeatherDataByCoords(lat, lon);
      if (weatherData) {
        setWeather(weatherData);
        setLocationError(null);
      } else {
        setWeather(null);
        setLocationError("Failed to fetch weather data.");
      }
    };

    const handleGeolocation = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherAndUpdateByCoords(latitude, longitude);
    };

    const handleGeolocationError = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error.message);
      setLocationError("Falling back to default city.");
      fetchWeatherAndUpdate(defaultCity);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocation,
        handleGeolocationError
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      fetchWeatherAndUpdate(defaultCity);
    }
  }, [city, defaultCity]);

  return (
    <div className="flex items-center justify-center p-4 text-sm md:text-base rounded-lg shadow-md">
      <div className="text-center flex flex-col md:text-left justify-start items-start">
        {weather ? (
          <div className="flex flex-col items-center md:items-start">
            <span className="flex items-center gap-2 mb-2">
              {getIconForFeelsLike(weather.main.feels_like)}
              <span>{weather.main.temp}°C</span>
              <span className="text-primary">({weather.name})</span>
            </span>
            <span className="text-muted-foreground">
              Feels Like: {weather.main.feels_like}°C
            </span>
          </div>
        ) : (
          <span className="text-red-500">
            <WeatherLoadingSkeleton />
          </span>
        )}
      </div>
    </div>
  );
};

export default Weather;
