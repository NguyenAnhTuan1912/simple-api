// import React from 'react'
import { useNavigate } from 'react-router-dom';

// Import components
import Button from 'src/components/buttons/Button';

// Import routes configuration
import { RouteNames } from 'src/routes.config';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100dvh-93px)]">
      <h1 className="text-center font-bold text-5xl mb-2">Simple API</h1>
      <p className="max-w-[640px] text-center text-xl">Công cụ giả lập yêu cầu dữ liệu từ API, đơn giản, nhanh chóng và dễ sử dụng</p>
      <div className="w-fit mx-auto mt-[24px]">
        <Button
          onClick={() => navigate(RouteNames.Document.Path)}
        >
          Xem tài liệu
        </Button>
      </div>
    </div>
  )
}