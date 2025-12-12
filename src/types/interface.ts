// 1. Định nghĩa Interface cho mỗi mục dự báo hàng ngày
export interface DailyItem {
  day: string;
  icon: string; // Đường dẫn file ảnh
  high: number;
  low: number;
  isFake?: boolean; // Nếu bạn dùng logic đệm dữ liệu giả
}

// 2. Định nghĩa Interface cho prop Data (chứa mảng daily)
export interface DailyForecastProps {
  data: {
    daily: DailyItem[];
    // Thêm các trường khác nếu component này hoặc các component liên quan cần truy cập chúng
    // location?: string; 
    // temperature?: number;
  };
}

export interface HeaderProps {
    unit: 'metric' | 'imperial'; // Giới hạn kiểu cho đơn vị
    onUnitChange: (newUnit: 'metric' | 'imperial') => void;
}

export interface HourlyItem {
  dayName: string; // Tên ngày (Long format)
  time: string;
  temp: number;
  icon: string; // Đường dẫn file ảnh
}

// Định nghĩa Interface cho props của component
export interface HourlyForecastProps {
  data: {
    hourly: HourlyItem[];
    // Giả định data.hourly là mảng đầy đủ 40 mốc giờ
  };
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

// 1. Định nghĩa Interface cho props
export interface SearchSectionProps {
  onSearch: (location: string) => void;
  onSearchChange: (value: string) => void;
  searchResults: string[];
  onSelectLocation: (location: string) => void;
  loading: boolean;
}
// 1. Định nghĩa Interface cho prop Data
export interface WeatherCardProps {
    data: {
        location: string;
        date: string;
        temperature: number;
        icon: string; // Đường dẫn/URL của icon
        // Thêm các trường khác nếu bạn cần truy cập chúng
        // feelsLike?: number;
        // humidity?: number;
        // wind?: number;
    };
}



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

// --- Định nghĩa Interface cho Props của Component WeatherContent ---
export interface WeatherContentProps {
    weatherData: WeatherData | null; // Có thể là null trong trạng thái ban đầu/loading
    loading: boolean;
    error: string | null; // Kiểu string cho thông báo lỗi, null nếu không có lỗi
    onRetry: () => void;
    selectedDay: string;
    onSelectDay: (day: string) => void;
}
