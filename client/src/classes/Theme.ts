/*
  IDEA
  This `Theme` will be used with tailwindcss, there are 2 steps we need to do:
    - Define theme and import to `tailwind.config.ts` for building.
    - Use this `Theme` to change theme in app.

  Depend on theme's concept of tailwind, we need to defined each color has themes and `DEFAULT` value
  of it, for example:
  ```
  colors: {
    primary: {
      "light": "#FFF", // Light theme
      "dark": "#2626262", // Dark theme
      "DEFAULT": "#F1F1F1" // Optional
    }
  }
  ```
*/

const __ThemeNames = {
  light: "light",
  dark: "dark"
}

let __instance!: Theme;

export const __ThemePropertyNames = {
  primary: "primary",
  onPrimary: "on-primary",
  // secondary: string,
  // onSecondary: string,
  // tertiary: string,
  // onTertiary: string,
  outline: "outline",
  onOutline: "on-outline",
  // subOutline: string,
  // onSubOutline: string,
  background: "background",
  onBackground: "on-background",
  // subBackground: string,
  // onSubBackground: string,
  // success?: string,
  // onSuccess?: string,
  // error?: string,
  // onError?: string,
  // waring?: string,
  // onWarning?: string,
  // info?: string,
  // onInfo?: string
}

export type ThemeNames = keyof typeof __ThemeNames;

export type ThemePropertyNames = keyof typeof __ThemePropertyNames;

/**
 * Create an instance to manage theme in app. Be set up with tailwind in compile-time.
 */
export class Theme {
  colors!: {[N in ThemePropertyNames]: string};
  styleContent!: Array<string>;
  initializedStyleContent!: string;

  static currentTheme: string = "";

  constructor() {
    if(__instance) return __instance;
    (this.colors as any) = {};
    this.styleContent = [];
    this.initializedStyleContent = ":root { }";
  }

  /**
   * Use this method to set theme colors. It receives a array of string theme's property that has the
   * following format: `<name>:<value of color in theme 1>:...:<value of color in theme n>`, the order of
   * __value of color in theme__ depends on `themeNames`.
   * 
   * This will create a `<style>` and an `colors` object.
   * @param colorStrs 
   */
  setThemes(themeNames: Array<string>, colorStrs: Array<string>) {
    // const headElement = document.getElementsByTagName("head")[0];
    // const themeStyleElement = document.createElement("style");

    // Generate content for <style>
    // and generate colors object for tailwind
    for(const str of colorStrs) {
      const [name, ...values] = str.split(":");
      if(values.length === 0) continue;
      let i = 0;
      for(const themeName of themeNames) {
        if(!values[i]) continue;

        const actualName = __ThemePropertyNames[name as ThemePropertyNames] as ThemePropertyNames;

        if(!actualName) {
          console.error(`The name - ${name} that you assigned isn't a valid name`);
          continue;
        }
        if(!this.colors[actualName]) (this.colors[actualName] as any) = {};
        if(!this.styleContent[i]) this.styleContent[i] = `.${themeName} { }`;

        const cssVariableName = `--color-${actualName}`;

        // RGB will be used, because it's more flexible than HEX
        this.colors[actualName] = `var(${cssVariableName})`;

        // Add content to <style>
        this.styleContent[i] = this.styleContent[i].slice(0, this.styleContent[i].length - 1);
        this.styleContent[i] = this.styleContent[i] + cssVariableName + ": rgb(" + values[i] + "); }";
        this.initializedStyleContent = this.initializedStyleContent.slice(0, this.initializedStyleContent.length - 1);
        this.initializedStyleContent = this.initializedStyleContent + cssVariableName + ": " + values[i] + "; }";
        i++;
      }
      i = 0;
    }
    // headElement.appendChild(themeStyleElement);
  }

  /**
   * Get colors of themes
   */
  getColors() {
    return this.colors;
  }

  /**
   * Use this static method to use theme
   * @param themeName 
   */
  static enableTheme(themeName: ThemeNames) {
    if(!document.getElementById("theme")) {
      const headElement = document.getElementsByTagName("head")[0];
      const themeStyleElement = document.createElement("style");
      themeStyleElement.id = "theme";
      themeStyleElement.append(__instance.initializedStyleContent);
      themeStyleElement.append(...__instance.styleContent);
      headElement.appendChild(themeStyleElement);
    }
    
    if(document.documentElement.classList.contains(themeName)) return;
    if(document.documentElement.classList.contains(Theme.currentTheme))
      document.documentElement.classList.remove(Theme.currentTheme);

    document.documentElement.classList.add(themeName);
    Theme.currentTheme = themeName;
  }

  /**
   * Use this static method to create css variable name.
   * @param name 
   */
  // static generateCSSVariable(names: Array<string>) {
  //   let result = "--";
  //   for(let i = 0; i < names.length - 1; i++) {
  //     result += names[i] + (names[i + 1] ? "-" + names[i + 1] : "");
  //   }
  //   return result;
  // }
}

if(!__instance) __instance = new Theme();

// Define themes here
__instance.setThemes(
  Object.keys(__ThemeNames).map(key => __ThemeNames[key as ThemeNames]),
  [
    "primary:15, 24, 42:213, 223, 243",
    "onPrimary:250, 250, 250:54, 59, 70",
    "background:249, 249, 249:38, 38, 38",
    "onBackground:38, 38, 38:249, 249, 249",
    "outline:196, 181, 253:78, 69, 111",
    "onOutline:38, 37, 45:237, 237, 237"
  ]
);