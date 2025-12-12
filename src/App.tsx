"use client";

import { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";
import { fetchWeatherData, LocationNotFoundError } from "./utils/weatherApi";
import type { WeatherData } from "./utils/weatherApi";

const getBrowserUnit = (params: URLSearchParams) =>
  (params.get("unit") as "metric" | "imperial") || "metric";
const getBrowserLocation = (params: URLSearchParams) => params.get("location");

const updateUrlHistory = (location: string, unit: "metric" | "imperial") => {
  const encodedLocation = encodeURIComponent(location);
  const newUrl = `/?location=${encodedLocation}&unit=${unit}`;
  window.history.replaceState(null, "", newUrl);
};

export default function App() {
  const initialSearchParams = new URLSearchParams(window.location.search);
  const initialUnit = getBrowserUnit(initialSearchParams);
  const initialLocation = getBrowserLocation(initialSearchParams);

  const initialDay: string = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const [unit, setUnit] = useState<"metric" | "imperial">(initialUnit);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(initialDay);

  const handleSearch = useCallback(
    async (location: string) => {
      setLoading(true);
      setError(null);

      const searchLocation: string =
        location || initialLocation || "Berlin, Germany";

      try {
        const data: WeatherData = await fetchWeatherData(searchLocation, unit);

        setWeatherData(data);
        setSearchResults([]);
        setSelectedDay(initialDay);

        if (data?.location) {
          updateUrlHistory(data.location, unit);
        }
      } catch (err) {
        console.error("API Error:", err);

        if (err instanceof LocationNotFoundError) {
          setWeatherData(null);
          setError(null);
        } else {
          setError(
            "We couldn't get the weather data. Please try another city or check your API key."
          );
          setWeatherData(null);
        }
      } finally {
        setLoading(false);
      }
    },
    [unit, initialLocation]
  );

  useEffect(() => {
    if (!weatherData && !loading) {
      const defaultSearchLocation: string =
        initialLocation || "Berlin, Germany";
      handleSearch(defaultSearchLocation);
    }
  }, [handleSearch, weatherData, loading, initialLocation]);

  const handleSearchChange = (value: string) => {
    if (value.trim()) {
      setSearchResults([
        `${value}`,
        `${value}, France`,
        `${value}, Germany`,
        `${value}, USA`,
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (location: string) => {
    setSearchResults([]);
    handleSearch(location);
  };

  const handleUnitChange = (newUnit: "metric" | "imperial") => {
    if (newUnit !== unit) {
      setUnit(newUnit);

      const locationToRefetch: string =
        weatherData?.location || initialLocation || "Berlin, Germany";

      updateUrlHistory(locationToRefetch, newUnit);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header unit={unit} onUnitChange={handleUnitChange} />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <SearchSection
          onSearch={handleSearch}
          onSearchChange={handleSearchChange}
          searchResults={searchResults}
          onSelectLocation={handleSelectLocation}
          loading={loading}
        />
        <WeatherContent
          weatherData={weatherData}
          loading={loading}
          error={error}
          onRetry={() =>
            handleSearch(
              weatherData?.location || initialLocation || "Berlin, Germany"
            )
          }
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
      </main>
    </div>
  );
}
