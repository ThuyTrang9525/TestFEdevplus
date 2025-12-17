import type { DailyItem, HourlyItem } from "./forecast";

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
