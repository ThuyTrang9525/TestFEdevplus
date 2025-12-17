import type { WeatherData } from "./weather";

export interface HeaderProps {
  unit: "metric" | "imperial";
  onUnitChange: (newUnit: "metric" | "imperial") => void;
}

export interface WeatherCardProps {
  data: {
    location: string;
    date: string;
    temperature: number;
    icon: string;
  };
}

export interface WeatherContentProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  selectedDay: string;
  onSelectDay: (day: string) => void;
}
