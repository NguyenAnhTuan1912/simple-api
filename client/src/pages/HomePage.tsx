// import React from 'react'

// Import classes
import { Theme } from 'src/classes/Theme'

// Import components
import Button from 'src/components/buttons/Button'

export default function HomePage() {
  return (
    <div className="w-full mt-[72px]">
      <h1 className="text-center font-bold text-2xl">Simple API</h1>
      <p className="text-center text-lg">Công cụ giả lập yêu cầu dữ liệu từ API, đơn giản, nhanh chóng và dễ sử dụng</p>
      <div className="w-fit mx-auto mt-[24px]">
        <Button onClick={() => { Theme.enableTheme("dark"); }}>Bắt đầu ngay</Button>
      </div>
    </div>
  )
}