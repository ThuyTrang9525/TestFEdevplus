// src/utils/weatherApi.ts

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
export interface WeatherData {
    location: string;
    date: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    wind: number;
    windUnit: string;
    precipitation: number;
    precipitationUnit: string;
    icon: string;
    hourly: HourlyItem[];
    daily: DailyItem[];
}
export class LocationNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocationNotFoundError";
  }
}
import {
  SunnyIcon,
  PartlyCloudyIcon,
  CloudyIcon,
  OvercastIcon,
  DrizzleIcon,
  RainIcon,
  StormIcon,
  SnowIcon,
  FogIcon,
  DefaultIcon,
} from "../src/assets";
import type { DailyItem, HourlyItem } from "../src/types";

function getWeatherIcon(iconCode: string): string {
  if (iconCode.startsWith("01")) return SunnyIcon;
  if (iconCode.startsWith("02")) return PartlyCloudyIcon;
  if (iconCode.startsWith("03")) return CloudyIcon;
  if (iconCode.startsWith("04")) return OvercastIcon;
  if (iconCode.startsWith("09")) return DrizzleIcon;
  if (iconCode.startsWith("10")) return RainIcon;
  if (iconCode.startsWith("11")) return StormIcon;
  if (iconCode.startsWith("13")) return SnowIcon;
  if (iconCode.startsWith("50")) return FogIcon;
  return DefaultIcon;
}

function getDailyForecast(forecastList: any[], unit: string): DailyItem[] {
  const dailyData: Record<string, DailyItem> = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("en-US");

    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(item.main.temp);

    if (!dailyData[dayKey]) {
      dailyData[dayKey] = {
        day: dayName,
        icon: getWeatherIcon(item.weather[0].icon),
        high: temp,
        low: temp,
      };
    } else {
      if (temp > dailyData[dayKey].high) dailyData[dayKey].high = temp;
      if (temp < dailyData[dayKey].low) dailyData[dayKey].low = temp;
    }
  });

  const realDays: DailyItem[] = Object.values(dailyData);

  while (realDays.length < 7) {
    const lastDate =
      realDays.length > 0
        ? new Date(forecastList[forecastList.length - 1].dt * 1000)
        : new Date();

    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 1);

    const nextDayName = nextDate.toLocaleDateString("en-US", {
      weekday: "short",
    });

    realDays.push({
      day: nextDayName,
      icon: DefaultIcon,
      high: unit === "metric" ? 25 : 77,
      low: unit === "metric" ? 15 : 59,
      isFake: true,
    });
  }

  return realDays.slice(0, 7);
}

function formatApiData(current: any, forecast: any, unit: string): WeatherData {
  const allHourlyForecast: HourlyItem[] = forecast.list.map((item: any) => ({
    dayName: new Date(item.dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    temp: Math.round(item.main.temp),
    icon: getWeatherIcon(item.weather[0].icon),
  }));

  const dailyData: DailyItem[] = getDailyForecast(forecast.list, unit);

  return {
    location: `${current.name}, ${current.sys.country}`,
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    temperature: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    wind: Math.round(current.wind.speed * (unit === "metric" ? 3.6 : 2.237)),
    windUnit: unit === "metric" ? "km/h" : "mph",
    precipitation: 0,
    precipitationUnit: unit === "metric" ? "mm" : "in",
    icon: getWeatherIcon(current.weather[0].icon),
    hourly: allHourlyForecast,
    daily: dailyData,
  };
}

export async function fetchWeatherData(
  location: string,
  unit: "metric" | "imperial"
): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error(
      "API Key is missing. Please check your .env file and server restart."
    );
  }

  const currentWeatherUrl = `${BASE_URL}weather?q=${location}&appid=${API_KEY}&units=${unit}`;
  const currentWeatherRes = await fetch(currentWeatherUrl);

  if (!currentWeatherRes.ok) {
    if (currentWeatherRes.status === 404) {
      throw new LocationNotFoundError("Location not found.");
    }

    throw new Error("API connection error.");
  }
  const currentData = await currentWeatherRes.json();

  const { lat, lon } = currentData.coord;
  const forecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
  const forecastRes = await fetch(forecastUrl);

  if (!forecastRes.ok) {
    throw new Error("Failed to fetch forecast data.");
  }
  const forecastData = await forecastRes.json();

  const formattedData: WeatherData = formatApiData(
    currentData,
    forecastData,
    unit
  );
  return formattedData;
}
