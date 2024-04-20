import React from 'react'

export default function HomePage() {
  return (
    <div className="w-full p-4 mt-[36px]">
      <h1 className="text-center font-bold text-2xl">Simple API</h1>
      <p className="text-center text-lg">Công cụ giả lập yêu cầu dữ liệu từ API, đơn giản, nhanh chóng và dễ sử dụng</p>
      <div className="w-fit mx-auto mt-[24px]">
        <button className="px-4 py-3 rounded-lg text-white bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring focus:ring-violet-300">Bắt đầu ngay</button>
      </div>
    </div>
  )
}