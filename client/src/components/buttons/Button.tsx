// import React from 'react'

// Import classes
// import { Theme } from 'src/classes/Theme'

// Import types
// import type { ThemeNames } from 'src/classes/Theme';
import type { ButtonProps, Button_BorderRadiusTypes, Button_ColorTypes } from './Button.props';

const __BorderRadiusTypes: {[key in Button_BorderRadiusTypes]: string} = {
  normal: "",
  rounded: "px-4 py-3 rounded-lg",
  full_rounded: "p-4 rounded-[100%]"
}

function appendBorderRadius(className: string, type: Button_BorderRadiusTypes | undefined) {
  if(!type) return className;
  return className + " " + __BorderRadiusTypes[type];
}

function appendColor(className: string, type: Button_ColorTypes) {
  if(!type) return className;
  const bgColor = "background-" + type;
  return className + " " + bgColor;
}

export default function Button({
  borderRadiusType = "rounded",
  colorType = "primary",
  extendClassName = "",
  ...props
}: ButtonProps) {
  let className = appendBorderRadius(extendClassName, borderRadiusType);
  className = appendColor(className, colorType);

  return (
    <button
      {...props}
      className={className}
    >
      { props.children }
    </button>
  )
}