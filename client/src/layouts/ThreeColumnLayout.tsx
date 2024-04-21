// import React from 'react'

type ThreeColumnLayoutProps = {
  leftSide: (() => JSX.Element) | JSX.Element;
  rightSide: (() => JSX.Element) | JSX.Element;
  mainSide: (() => JSX.Element) | JSX.Element;
}

export default function ThreeColumnLayout(props: ThreeColumnLayoutProps) {
  return (
    <div>
      {/* Left side */}
      {
        typeof props.leftSide === "function"
          ? <div>{props.leftSide()}</div>
          : <div>{props.leftSide}</div>
      }
      {/* Main side */}
      {
        typeof props.mainSide === "function"
          ? <div>{props.mainSide()}</div>
          : <div>{props.mainSide}</div>
      }
      {/* Right side */}
      {
        typeof props.rightSide === "function"
          ? <div>{props.rightSide()}</div>
          : <div>{props.rightSide}</div>
      }
    </div>
  )
}