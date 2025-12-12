// src/components/states/NoResultsState.tsx
"use client"
export default function NoResultsState() {
  return (
    <div className="text-center">
      {/* Tiêu đề chính, đảm bảo font và màu sắc nổi bật */}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-50">
        No search result found!
      </h2>
    </div>
  )
}