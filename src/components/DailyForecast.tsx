// src/components/DailyForecast.tsx

// 1. Định nghĩa Interface cho mỗi mục dự báo hàng ngày
interface DailyItem {
  day: string;
  icon: string; // Đường dẫn file ảnh
  high: number;
  low: number;
  isFake?: boolean; // Nếu bạn dùng logic đệm dữ liệu giả
}

// 2. Định nghĩa Interface cho prop Data (chứa mảng daily)
interface DailyForecastProps {
  data: {
    daily: DailyItem[];
    // Thêm các trường khác nếu component này hoặc các component liên quan cần truy cập chúng
    // location?: string; 
    // temperature?: number;
  };
}

// 3. Áp dụng interface vào component
export default function DailyForecast({ data }: DailyForecastProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-50 mb-4">Daily forecast</h3>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-3 overflow-x-auto pb-2">
        {data.daily.map((day, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <p className="text-slate-300 text-sm mb-3 font-semibold">{day.day}</p>
            
            <img 
              src={day.icon} 
              alt={`${day.day} weather icon`} 
              className="w-10 h-10 mx-auto mb-3" // Kích thước và căn giữa
            />
            
            <div className="flex justify-center gap-2">
              <p className="text-slate-50 font-semibold">{day.high}°</p>
              <p className="text-slate-500">{day.low}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}