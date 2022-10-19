import {
  createTheme,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from "@mui/material";
import mergeDeep from "@eGroupAI/utils/mergeDeep";
import {
  palette as defaultPalette,
  typography as defaultTypography,
  egPalette as defaultEgPalette,
  egShadows as defaultEgShadows,
  egShape as defaultEgShape,
  EgShadows,
  EgShape,
  EgPalette,
  ColorObject,
} from "./themeOptions";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {
    egPalette: EgPalette;
    egShadows: EgShadows;
    egShape: EgShape;
  }
}

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    egPalette: EgPalette;
    egShadows: EgShadows;
    egShape: EgShape;
  }

  interface ThemeOptions {
    egPalette: EgPalette;
    egShadows: EgShadows;
    egShape: EgShape;
  }
}

export interface Options
  extends Omit<ThemeOptions, "egPalette" | "egShadows" | "egShape"> {
  egPalette?: {
    text?: ColorObject;
    primary?: ColorObject;
    secondary?: ColorObject;
    info?: ColorObject;
    success?: ColorObject;
    warning?: ColorObject;
    error?: ColorObject;
    grey?: ColorObject;
  };
  egShadows?: EgShadows;
  egShape?: EgShape;
}

const createEgTheme = (options?: Options) => {
  const { palette, typography, egPalette, egShadows, egShape, ...other } =
    options || {};
  return responsiveFontSizes(
    createTheme({
      palette: mergeDeep(defaultPalette, palette),
      typography: mergeDeep(defaultTypography, typography),
      egPalette: mergeDeep(defaultEgPalette, egPalette),
      egShadows: mergeDeep(defaultEgShadows, egShadows),
      egShape: mergeDeep(defaultEgShape, egShape),
      ...other,
    })
  );
};

export default createEgTheme;
