export interface DailyItem {
  day: string;
  icon: string;
  high: number;
  low: number;
  isFake?: boolean;
}

export interface HourlyItem {
  dayName: string;
  time: string;
  temp: number;
  icon: string;
}
