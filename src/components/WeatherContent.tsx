// src/components/WeatherContent.tsx
'use client'
import ErrorState from "./states/ErrorState"
import LoadingState from "./states/LoadingState"
import WeatherCard from "./WeatherCard"
import MetricsGrid from "./MetricsGrid"
import DailyForecast from "./DailyForecast"
import HourlyForecast from "./HourlyForecast"
import NoResultsState from "./states/NoResultsState"

// --- Định nghĩa Interface cho dữ liệu thời tiết (Weather Data) ---
// Đây là cấu trúc dữ liệu được trả về từ fetchWeatherData trong weatherApi.js
interface DailyItem {
    day: string;
    icon: string;
    high: number;
    low: number;
    isFake?: boolean;
}

interface HourlyItem {
    dayName: string;
    time: string;
    temp: number;
    icon: string;
}

interface WeatherData {
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

// --- Định nghĩa Interface cho Props của Component WeatherContent ---
interface WeatherContentProps {
    weatherData: WeatherData | null; // Có thể là null trong trạng thái ban đầu/loading
    loading: boolean;
    error: string | null; // Kiểu string cho thông báo lỗi, null nếu không có lỗi
    onRetry: () => void;
    selectedDay: string;
    onSelectDay: (day: string) => void;
}


export default function WeatherContent({ 
    weatherData, 
    loading, 
    error, 
    onRetry, 
    selectedDay, 
    onSelectDay 
}: WeatherContentProps) {
    
    // Đảm bảo TypeScript biết rằng weatherData KHÔNG phải là null/undefined khi sử dụng
    // (Kiểm tra này đã được thực hiện bởi các câu lệnh 'if' bên trên)
    const data = weatherData as WeatherData;

    if (error) {
        return <ErrorState onRetry={onRetry} />
    }

    if (loading) {
        return <LoadingState />
    }

    if (!weatherData) {
        return <NoResultsState />
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-stretch">
            
            {/* CỘT TRÁI (2/3 chiều rộng) */}
            {/* THÊM: flex flex-col để xếp chồng các mục và xác định chiều cao cột */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
                <WeatherCard data={data} />
                <MetricsGrid data={data} />
                <DailyForecast data={data} />
            </div>

            {/* CỘT PHẢI (1/3 chiều rộng) */}
            {/* THÊM: h-full để buộc HourlyForecast kéo dài hết chiều cao Grid cell */}
            <div className="lg:col-span-1 h-full">
                <HourlyForecast data={data} selectedDay={selectedDay} onSelectDay={onSelectDay} />
            </div>
        </div>
    )
}