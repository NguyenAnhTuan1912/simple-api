// import React from 'react'

// Import classes
import { __ThemePropertyNames } from 'src/classes/Theme'

// Import types
// import type { ThemeNames } from 'src/classes/Theme';
import type { ButtonProps, Button_BorderRadiusTypes, Button_ColorTypes } from './Button.props';

const __BorderRadiusTypes: {[key in Button_BorderRadiusTypes]: string} = {
  normal: "",
  rounded: "px-4 py-3 rounded-lg",
  full_rounded: "p-4 rounded-[100%]"
}

const __Colors: {[N in keyof typeof __ThemePropertyNames]: { bg: string, text: string }} = {
  "primary": {
    bg: "bg-primary focus:non-outline focus:ring focus:ring-outline",
    text: "text-on-primary"
  },
  "onPrimary": {
    bg: "",
    text: "text-"
  },
  "outline": {
    bg: "",
    text: "text-"
  },
  "onOutline": {
    bg: "",
    text: "text-"
  },
  "background": {
    bg: "",
    text: "text-"
  },
  "onBackground": {
    bg: "",
    text: "text-"
  }
}

function appendBorderRadius(className: string, type: Button_BorderRadiusTypes | undefined) {
  if(!type) return className;
  return className + " " + __BorderRadiusTypes[type];
}

function appendColor(className: string, type: Button_ColorTypes) {
  if(!type) return className;
  return className + " " + __Colors[type].bg + " " + __Colors[type].text;
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