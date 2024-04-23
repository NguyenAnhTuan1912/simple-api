// import React from 'react'

// Import classes
import { __ThemePropertyNames } from 'src/classes/Theme'

// Import types
// import type { ThemeNames } from 'src/classes/Theme';
import type { ButtonProps, Button_Types, Button_ColorTypes } from './Button.props';

const __BorderRadiusTypes: {[key in Button_Types]: string} = {
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
    bg: "bg-on-primary focus:non-outline focus:ring focus:ring-outline",
    text: "text-primary"
  },
  "outline": {
    bg: "bg-outline focus:non-outline focus:ring focus:ring-outline",
    text: "text-on-outline"
  },
  "onOutline": {
    bg: "bg-on-outline focus:non-outline focus:ring focus:ring-outline",
    text: "text-outline"
  },
  "background": {
    bg: "bg-background focus:non-outline focus:ring focus:ring-outline",
    text: "text-background"
  },
  "onBackground": {
    bg: "bg-on-background focus:non-outline focus:ring focus:ring-outline",
    text: "text-on-background"
  }
}

function appendBorderRadius(className: string, type: Button_Types | undefined) {
  if(!type) return className;
  return className + " " + __BorderRadiusTypes[type];
}

function appendColor(className: string, type: Button_ColorTypes) {
  if(!type) return className;
  return className + " " + __Colors[type].bg + " " + __Colors[type].text;
}

export default function Button({
  buttonType = "rounded",
  colorType = "primary",
  extendClassName,
  ...props
}: ButtonProps) {
  let className = appendBorderRadius("", buttonType);
  className = appendColor(className, colorType);

  className += extendClassName ? " " + extendClassName : "";
  className = className.trim();

  return (
    <button
      {...props}
      className={className}
    >
      { props.children }
    </button>
  )
}