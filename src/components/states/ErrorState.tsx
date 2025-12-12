"use client"

// ------------------------------------------------------------------
// BƯỚC 1: IMPORT CÁC FILE SVG BẰNG ĐƯỜNG DẪN TƯƠNG ĐỐI (../../assets/images/)
// ------------------------------------------------------------------
import ErrorIcon from "../../assets/images/icon-error.svg";
import RetryIcon from "../../assets/images/icon-loading.svg"; // Dùng icon-loading cho nút Retry

export default function ErrorState({ onRetry }) {
  return (
    // Thêm py-24 để có khoảng cách dọc tốt hơn
    <div className="flex flex-col items-center justify-center"> 
    
      <div className="mb-6">
        <img src={ErrorIcon} alt="Error"  />
      </div>

      <h2 className="text-4xl font-bold text-slate-50 mb-3">Something went wrong</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        We couldn't connect to the server (API error). Please try again in a few moments.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
      >
        <img src={RetryIcon} alt="Retry" className="w-5 h-5 animate-spin-slow" />
        Retry
      </button>
    </div>
  )
}