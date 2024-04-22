// import React from 'react'

// Import components
import Header from "src/components/header/Header"

type ThreeColumnLayoutProps = {
  leftSide: (() => JSX.Element) | JSX.Element;
  rightSide: (() => JSX.Element) | JSX.Element;
  mainSide: (() => JSX.Element) | JSX.Element;
}

const __classNames = {
  main: "w-3/5 bg-red-100",
  left: "w-1/5 bg-blue-100",
  right: "w-1/5 bg-green-100"
}

// Freeze and Seal


export default function ThreeColumnLayout(props: ThreeColumnLayoutProps) {
  return (
    <>
      <Header />
      <div className="flex w-full min-h-screen">
        {/* Left side */}
        {
          typeof props.leftSide === "function"
            ? <div className={__classNames.left}>{props.leftSide()}</div>
            : <div className={__classNames.left}>{props.leftSide}</div>
        }
        {/* Main side */}
        {
          typeof props.mainSide === "function"
            ? <div className={__classNames.main}>{props.mainSide()}</div>
            : <div className={__classNames.main}>{props.mainSide}</div>
        }
        {/* Right side */}
        {
          typeof props.rightSide === "function"
            ? <div className={__classNames.right}>{props.rightSide()}</div>
            : <div className={__classNames.right}>{props.rightSide}</div>
        }
      </div>
    </>
  )
}