import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";

import {
  fetchWeatherData,
  LocationNotFoundError,
} from "../services/weatherApi";
import type { WeatherData } from "../services/weatherApi";

type Unit = "metric" | "imperial";

const DEFAULT_LOCATION = "Berlin, Germany";
const DEFAULT_UNIT: Unit = "metric";

export default function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location") ?? DEFAULT_LOCATION;
  const unit = (searchParams.get("unit") as Unit) ?? DEFAULT_UNIT;

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWeatherData(location, unit);
        if (cancelled) return;

        setWeatherData(data);
        setSelectedDay(
          new Date().toLocaleDateString("en-US", { weekday: "long" })
        );
      } catch (err) {
        if (cancelled) return;

        if (err instanceof LocationNotFoundError) {
          setWeatherData(null);
          setError(null);
        } else {
          setWeatherData(null);
          setError(
            "We couldn't get the weather data. Please try another city."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [location, unit]);

  const pushUrl = useCallback(
    (nextLocation: string, nextUnit: Unit = unit) => {
      const params = new URLSearchParams({
        location: nextLocation,
        unit: nextUnit,
      });

      navigate(`/?${params.toString()}`);
    },
    [navigate, unit]
  );

  const handleSearch = (value: string) => {
    pushUrl(value || DEFAULT_LOCATION);
  };

  const handleSelectLocation = (value: string) => {
    setSearchResults([]);
    pushUrl(value);
  };

  const handleUnitChange = (nextUnit: Unit) => {
    if (nextUnit !== unit) {
      pushUrl(location, nextUnit);
    }
  };

  const handleSearchChange = (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchResults([
      value,
      `${value}, France`,
      `${value}, Germany`,
      `${value}, USA`,
    ]);
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
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          onRetry={() => pushUrl(location, unit)}
        />
      </main>
    </div>
  );
}
