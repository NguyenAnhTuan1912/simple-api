import React from 'react'

// Import components
import Button from 'src/components/buttons/Button'

export default function HomePage() {
  return (
    <div className="w-full p-4 mt-[36px]">
      <h1 className="text-center font-bold text-2xl">Simple API</h1>
      <p className="text-center text-lg">Công cụ giả lập yêu cầu dữ liệu từ API, đơn giản, nhanh chóng và dễ sử dụng</p>
      <div className="w-fit mx-auto mt-[24px]">
        <Button>Bắt đầu ngay</Button>
      </div>
    </div>
  )
}