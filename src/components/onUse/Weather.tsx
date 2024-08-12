"use client";
import { ThermometerSun, CloudSun, Sun, Cloud, Moon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  fetchWeatherDataByCity,
  fetchWeatherDataByCoords,
} from "@/lib/weatherApi";

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
      setLocationError(
        "Unable to retrieve location. Falling back to default city."
      );
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
    <div className="flex items-center justify-center md:justify-start">
      <div className="text-center flex flex-col md:text-left justify-start items-start">
        {weather ? (
          <>
            <span className="flex gap-1 items-center text-lg font-semibold">
              {getIconForFeelsLike(weather.main.feels_like)}{" "}
              {weather.main.feels_like}°C {weather.name}
            </span>
            <span className="text-muted-foreground">
              Actual Temperature: {weather.main.temp}°C
            </span>
          </>
        ) : (
          <span>{locationError || "Loading weather data..."}</span>
        )}
      </div>
    </div>
  );
};

export default Weather;
