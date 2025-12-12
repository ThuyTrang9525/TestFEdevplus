// src/components/WeatherCard.tsx
import bgImageLarge from "../assets/images/bg-today-large.svg"; // Import hình ảnh SVG lớn
import bgImageSmall from "../assets/images/bg-today-small.svg"; // Import hình ảnh SVG nhỏ

// 1. Định nghĩa Interface cho prop Data
interface WeatherCardProps {
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

// 2. Áp dụng interface vào component
export default function WeatherCard({ data }: WeatherCardProps) {
 // Kích thước icon lớn (ví dụ: w-24 h-24 cho màn hình lớn)
 const iconSizeClass = "w-20 h-20 md:w-24 md:h-24";

 return (
  <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden h-48 flex flex-col justify-between">
   {/* Nền SVG đã được cấu hình */}
   <div
    className="absolute inset-0 opacity-20 pointer-events-none"
   >
        {/* 1. Hình ảnh LỚN (Chỉ hiển thị trên màn hình MD trở lên) */}
        <div
            className="hidden md:block absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImageLarge})` }}
        ></div>

        {/* 2. Hình ảnh NHỎ (Chỉ hiển thị trên màn hình default/SM) */}
        <div
            className="block md:hidden absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImageSmall})` }}
        ></div>
   </div>

   <div className="relative z-10">
    <h3 className="text-3xl font-bold mb-1">{data.location}</h3>
    <p className="text-indigo-100">{data.date}</p>
   </div>

   <div className="relative z-10 flex items-end justify-between">
    <div className="flex items-center">
     <img
      src={data.icon}
      alt="Current Weather Icon"
      className={iconSizeClass}
     />
    </div>

    <div className="text-7xl md:text-8xl font-bold">
     {data.temperature}°
    </div>
   </div>
  </div>
 );
}