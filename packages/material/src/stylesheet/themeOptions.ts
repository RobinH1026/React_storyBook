import getColorObject from "./getColorObject";

export const egPalette = {
  text: getColorObject("#373737"),
  primary: getColorObject("#0474AD"),
  secondary: getColorObject("#E95050"),
  info: getColorObject("#05C7F2"),
  success: getColorObject("#00BF78"),
  warning: getColorObject("#FFBC6E"),
  error: getColorObject("#E95050"),
  grey: getColorObject("#646464"),
};

export const palette = {
  text: {
    primary: egPalette.text[1],
    secondary: egPalette.text[2],
  },
  info: {
    dark: egPalette.info[0],
    main: egPalette.info[1],
    light: egPalette.info[2],
  },
  primary: {
    dark: egPalette.primary[0],
    main: egPalette.primary[1],
    light: egPalette.primary[2],
  },
  secondary: {
    dark: egPalette.secondary[0],
    main: egPalette.secondary[1],
    light: egPalette.secondary[2],
  },
  success: {
    dark: egPalette.success[0],
    main: egPalette.success[1],
    light: egPalette.success[2],
  },
  warning: {
    dark: egPalette.warning[0],
    main: egPalette.warning[1],
    light: egPalette.warning[2],
  },
  error: {
    dark: egPalette.error[0],
    main: egPalette.error[1],
    light: egPalette.error[2],
  },
  action: {
    disabledBackground: "#DCDCDC",
  },
};

export const egShadows = [
  "none",
  "0 3px 16px 0 rgba(10, 75, 109, 0.08)",
  "0 6px 26px 0 #efeff7",
  "0px 0px 30px 1px #0000001f",
];

export const egShape = {
  borderRadius: 25,
};

export const fontFamily = [
  "Poppins-Light",
  '"Segoe UI"',
  "SegoeUI",
  '"Microsoft JhengHei"',
  "微軟正黑體",
  '"SF Pro TC"',
  '"SF Pro Display"',
  '"SF Pro Icons"',
  '"PingFang TC"',
  '"Helvetica Neue"',
  '"Helvetica"',
  '"Arial"',
  "sans-serif",
];

export const typography = {
  fontFamily: fontFamily.join(","),
  h1: {
    fontSize: "3.75rem",
  },
  h2: {
    fontSize: "3rem",
  },
  h3: {
    fontSize: "2.5rem",
  },
  h4: {
    fontSize: "1.875rem",
  },
  h5: {
    fontSize: "1.5rem",
  },
  h6: {
    fontSize: "1.125rem",
  },
  body1: {
    fontSize: "1rem",
  },
};

export type ColorObject = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
};
export type EgPalette = {
  text: ColorObject;
  primary: ColorObject;
  secondary: ColorObject;
  info: ColorObject;
  success: ColorObject;
  warning: ColorObject;
  error: ColorObject;
  grey: ColorObject;
};
export type EgShadows = string[];
export type EgShape = {
  borderRadius: number;
};
