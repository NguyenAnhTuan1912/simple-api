// Import objects
import { MyMap } from "src/objects/MyMap";

const __ThemeNames = {
  dark: "dark",
  light: "light"
}

/*
  Color theory
  An app will has many color on it, some emphasized colors, some less emphasized colors... So
  I divide the color them into multiple pairs.

  - Primary and onPrimary: this is the second frequent apparent color in the app.
  `on` is that mean the color that darker when is placed on the original one.
  - Second and onSecond: like primary and onPrimary, but second and onSecond is less
  emphasized than primary.
  - Tertiary and onTertiary: is less emphasized than second and onSecond and the functional
  of this color is distinguish primary and second.

  - Outline and onOutline: this pair is slighty contrast with background and onBackground and the functional
  of pair is split the content of UI, highlight areas.
  - SubOutline and OnSubOutline: is lighter than outline pair.
  - Background and onBackground: yes and this is the most frequent apparent color in the app.
  The contrastive color of primary pair.
  - SubBackground and OnSubBackground: lighter than background pair.

  Furthermore, there are 4 pairs of color (optional):
  - success and onSuccess: a color that represent for successful action in notification or some where else,
  or can be use in agree...
  - error and onError: a color taht represent for failed action in notification or some where else,
  or can be use in disagree...
  - warning and onWarning: a color that represent for warning.
  - info and onInfo: a color that represent for information.

  Note: color doesn't contains alpha parameter.
*/

export type ThemeProperties = {
  primary: string;
  onPrimary: string;
  // secondary: string;
  // onSecondary: string;
  // tertiary: string;
  // onTertiary: string;
  outline: string;
  onOutline: string;
  // subOutline: string;
  // onSubOutline: string;
  background: string;
  onBackground: string;
  // subBackground: string;
  // onSubBackground: string;
  // success?: string;
  // onSuccess?: string;
  // error?: string;
  // onError?: string;
  // waring?: string;
  // onWarning?: string;
  // info?: string;
  // onInfo?: string;
}

export type ThemeObjectProperties = {
  name: string;
  rgbTheme: MyMap<keyof Partial<ThemeProperties>, [string, string]>;
  hexTheme: MyMap<keyof Partial<ThemeProperties>, [string, string]>;
  isInstalled: boolean;
}

export type ThemeNames = keyof typeof __ThemeNames;

export type ThemePropertyNames = keyof ThemeProperties;

/**
 * Use this static class to create a Theme.
 * 
 * Default theme is installed in `variables.css` file.
 * 
 * First, you need to use `setTheme` method to add theme to css. The value
 * will be stored as css variables. This method receive: 
 * - An array of tuple, first element of tuple is the name of color and
 * the second is the value of it. For example:
 * ```
 * Theme.setTheme([
 *   ["primary", "242,12,92"],
 *   ["onPrimary", "123, 123, 123"]
 *   ["background", "FFF"],
 *   ["onBackground", "262626"]
 * ])
 * ```
 * - An array of string that are in format `key:value`. For example:
 * ```
 * Theme.setTheme([
 *   "primary: 242,12,92",
 *   "onPrimary: 123, 123, 123",
 *   "background:FFF",
 *   "onBackground:262626"
 * ])
 * ```
 * 
 * Note: HEX Theme is required. RGB is optional.
 */
export class Theme {
  /**
   * Use to get `key` and `value` of color.
   */
  static ColorKeyValueRegExp = /(\w+):\s*(?:(\d+,\s*\d+,\s*\d+)|(\w{0,6})$)/;
  /**
   * Use to get or check value of RGB Color.
   */
  static RGBTypeColorValueRegExp = /(\d+,\s*\d+,\s*\d+)/;
  /**
   * Use to get or check value of HEX Color.
   * Not contains the `#`.
   */
  static HEXTypeColorValueRegExp = /^(\w{0,6})$/;
  static RequiredColors: Array<keyof ThemeProperties> = [
    // "primary", "onPrimary",
    "background", "onBackground"
  ];
  static styleThemeElement = document.getElementById("theme")!;

  // Lock constructor
  private constructor() {}

  /**
   * Use this static method to create a Theme object.
   * @param name 
   * @returns 
   */
  static createTheme(name: string): ThemeObjectProperties {
    return {
      name,
      hexTheme: new MyMap(),
      rgbTheme: new MyMap(),
      isInstalled: false
    }
  }

  /**
   * Use this static method to generate `key` and `value` from a str.
   * For examples:
   * - The clr is `background:FFF`, the result is `["background", "#FFF", "HEX"]`.
   * - The clr is `["background", "FFF"]`, the result is `["background", "#FFF", "HEX"]`.
   * - The clr is `onBackground:38, 38, 38`, the result is `["onBackground", "38, 38, 38", "RGB"]`.
   * - The clr is `["onBackground", "38, 38, 38"]`, the result is `["onBackground", "38, 38, 38", "RGB"]`.
   * @param clr 
   */
  static generateKeyAndColor(clr: string | [string, string]) {
    try {
      if(Array.isArray(clr)) {
        const [value, type] = Theme.toColor(clr[1])!;
        return [clr[0], value, type];
      }
  
      const match = clr.match(Theme.ColorKeyValueRegExp);

      if(!match) throw new Error("The color is not correct. Please, review the rule.");
  
      // If match[2], that mean the value of color is RGB value.
      let matchResult = match[2];
      
      // If match[3], that mean the value of color is HEX value.
      if(match[3]) {
        matchResult = match[3];
      }
      
      // Get value and type.
      const [value, type] = Theme.toColor(matchResult)!;

      return [match[1], value, type];
    } catch (error: any) {
      console.error("Theme Error: ", error.message);
      return [];
    }
  }

  /**
   * Use this static method to check value of RGB Color.
   * @param color 
   * @returns 
   */
  static isRGBColorValue(color: string) {
    return Theme.RGBTypeColorValueRegExp.test(color);
  }

  /**
   * Use this static method to check value of HEX Color.
   * @param color 
   * @returns 
   */
  static isHEXColorValue(color: string) {
    return Theme.HEXTypeColorValueRegExp.test(color);
  }

  /**
   * Use this static method to convert a color to css variable. The HEX type will
   * be considered as default, so css variable doesn't contains this type.
   * @param colorName 
   * @param colorValue 
   * @param colorType 
   * @returns 
   */
  static toCSSVariable(colorName: string, colorValue: string, colorType: string) {
    if(colorType === "HEX") return `--clr-${colorName}: ${colorValue}`;
    return `--clr-rgb-${colorName}: ${colorValue}`;
  }

  /**
   * Use this static method to get complete color from value.
   * Return [value, type]
   * @param value 
   */
  static toColor(value: string) {
    if(!value) throw new Error("Require value of color.");

    // If value is value of hex.
    if(Theme.isHEXColorValue(value))
      return [`#${value}`, "HEX"];
    
    // If value is value of rgb.
    if(Theme.isRGBColorValue(value))
      return [value, "RGB"];
  }

  /**
   * Use this static method to check if theme is completely install.
   * @param theme 
   * @returns 
   */
  static check(theme: ThemeObjectProperties) {
    for(const requiredColor of Theme.RequiredColors) {
      return Boolean(theme.hexTheme.get(requiredColor))
    }
  }

  /**
   * __Important__
   * 
   * Use this static method to set theme. Receive a value of string or tuple.
   * @param theme 
   * @param values 
   * @returns 
   */
  static setTheme(theme: ThemeObjectProperties, values: string[] | [string, string][]) {
    try {
      for(const value of values) {
        const [colorName, colorValue, colorType] = Theme.generateKeyAndColor(value);

        if(colorType === "RGB")
          theme.rgbTheme.set(colorName as keyof ThemeProperties, [colorValue, colorType]);
        else
          theme.hexTheme.set(colorName as keyof ThemeProperties, [colorValue, colorType]);
      }

      if(!Theme.check(theme)) throw new Error("The values is not enough color to set theme. Double check and try again.");

      return true;
    } catch (error: any) {
      // If has error, clear all values.
      theme.hexTheme.clear();
      console.error("Theme Error: ", error.message);

      return false;
    }
  }

  /**
   * Use this static method to add theme to css
   * @param theme 
   * @returns 
   */
  static install(theme: ThemeObjectProperties) {
    console.log("Install theme: ", theme.name);
    if(theme.isInstalled) return true;
    let cssTheme = `[data-theme="${theme.name}"] { \n`;

    // Add value (HEX).
    theme.hexTheme.forEach(function(value, colorName) {
      cssTheme += Theme.toCSSVariable(colorName, value[0], value[1]) + ";\n";
    });

    // Add value (RGB)
    theme.rgbTheme.forEach(function(value, colorName) {
      cssTheme += Theme.toCSSVariable(colorName, value[0], value[1]) + ";\n";
    });

    cssTheme += "}";

    // Add cssTheme to style#theme
    Theme.styleThemeElement!.innerHTML += cssTheme;

    return true;
  }

  /**
   * Use this static method to tell HTML use this theme by set the `data-theme` to theme's `name`.
   * The default value of `data-theme` is `default`.
   * @param theme 
   */
  static enableTheme(themeName: ThemeNames) {
    document.documentElement.setAttribute("data-theme", themeName);
  }

  /**
   * Use this static method to enable default theme.
   */
  static unableTheme() {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

// Create dark theme for `default` here or some supported themes.
// DEFAULT DARK
const dark = Theme.createTheme(__ThemeNames.dark);
const light = Theme.createTheme(__ThemeNames.light);

/*
  --clr-outline: #C5C5C5;
  --clr-rgb-outline: 197, 197, 197;
  --clr-subOutline: #F1F1F1;
  --clr-rgb-subOutline: 241, 241, 241;
*/

// setTheme
Theme.setTheme(
  dark,
  [
    "primary:5DC2E1",
    "primary:93, 194, 225",
    "onPrimary:5DC2E1",
    "onPrimary:93, 194, 225",
    "background:262626",
    "background:38, 38, 38",
    "onBackground:FFFFFF",
    "onBackground:255, 255, 255",
    "outline:595959",
    "outline:89, 89, 89",
    "onOutline:595959",
    "onOutline:89, 89, 89"
  ]
);

Theme.setTheme(
  light,
  [
    "primary:0F182A",
    "primary:15, 24, 42",
    "onPrimary:DADCE1",
    "onPrimary:218, 220, 225",
    "background:F9F9F9",
    "background:249, 249, 249",
    "onBackground:262626",
    "onBackground:38, 38, 38",
    "outline:C4B5FD",
    "outline:196, 181, 253",
    "onOutline:26252D",
    "onOutline:38, 37, 45"
  ]
);

// Install theme
Theme.install(dark);
Theme.install(light);