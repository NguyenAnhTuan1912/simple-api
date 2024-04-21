import React from 'react'
import { Link } from 'react-router-dom'
import { GrGithub } from "react-icons/gr";

// Import route names
import { RouteNames } from 'src/routenames'

export default function Header() {
  const NavItem_Elements = React.useMemo(() => {
    return Object.keys(RouteNames).map(function(key: string, index: number) {
      if(index === 0) return;

      return (
        <li key={key} className="mx-2 font-semibold hover:text-blue-500">
          {
            <Link to={RouteNames[key as (keyof typeof RouteNames)].Path}>{RouteNames[key as (keyof typeof RouteNames)].Name}</Link>
          }
        </li>
      )
    })
  }, []);

  return (
    <header className="border-b">
      <div className="flex justify-between p-4 m-auto w-full max-w-[1440px]">
        <h1 className="font-semibold text-xl">
          <Link to={"/"}>Simple API</Link>
        </h1>
        <div className="flex items-center">
          <nav className="border-r me-6 px-3">
            <ul className="flex flex-row">
              {
                NavItem_Elements
              }
            </ul>
          </nav>
          <a href="https://github.com/NguyenAnhTuan1912/simple-api" target="_blank">
            <GrGithub className="text-2xl cursor-pointer hover:bg-salte-50" />
          </a>
        </div>
      </div>
    </header>
  )
}