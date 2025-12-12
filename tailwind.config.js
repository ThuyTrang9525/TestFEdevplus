/** @type {import('tailwindcss').Config} */
export default {
  // Dòng này chỉ ra nơi Tailwind CSS cần quét các class của nó (tất cả file .html, .js, .ts, .jsx, .tsx trong thư mục src)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      // Ở đây bạn có thể thêm các màu, font, hoặc breakpoint tùy chỉnh nếu cần
      colors: {
        // Ví dụ: Thêm màu nền tối cho ứng dụng
        'dark-bg': '#1E293B', // Một màu tối phổ biến
        'primary-text': '#F8FAFC',
        'secondary-text': '#94A3B8',
      },
    },
  },
  plugins: [],
}