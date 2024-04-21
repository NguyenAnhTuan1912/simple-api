import React from 'react';

// Import types
import type { ThemePropertyNames } from 'src/classes/Theme';

export type Button_BorderRadiusTypes = "normal" | "rounded" | "full_rounded";
export type Button_ColorTypes = ThemePropertyNames;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  extendClassName?: string;
  borderRadiusType?: Button_BorderRadiusTypes;
  colorType?: Button_ColorTypes;
};