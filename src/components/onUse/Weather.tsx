// src/components/Weather.tsx
"use client";
import React, { useEffect, useState } from "react";

interface WeatherProps {
  city: string;
  defaultCity?: string;
}

const Weather: React.FC<WeatherProps> = ({
  city,
  defaultCity = "Biratnagar",
}) => {
  const [weather, setWeather] = useState<any>(null);
  const [locationError, setLocationError] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeather = async (cityName: string) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.cod === 200) {
          setWeather(data);
          setLocationError(false);
        } else {
          setWeather(null);
          setLocationError(true);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null);
        setLocationError(true);
      }
    };

    const handleGeolocation = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeather(data);
            setLocationError(false);
          } else {
            fetchWeather(defaultCity);
          }
        })
        .catch(() => fetchWeather(defaultCity));
    };

    const handleGeolocationError = () => {
      fetchWeather(defaultCity);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocation,
        handleGeolocationError
      );
    } else {
      fetchWeather(defaultCity);
    }
  }, [city, defaultCity]);

  return (
    <div className="text-center flex flex-col md:text-left">
      {weather ? (
        <>
          <span className="text-lg font-semibold">
            {weather.main.temp}°C {weather.name}
          </span>
          <span className="text-muted-foreground">
            Weather: {weather.weather[0].description}
          </span>
        </>
      ) : (
        <span>
          {locationError
            ? "Unable to get location."
            : "Loading weather data..."}
        </span>
      )}
    </div>
  );
};

export default Weather;
