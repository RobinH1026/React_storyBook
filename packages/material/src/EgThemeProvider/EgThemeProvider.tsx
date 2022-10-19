import React, { FC, ReactNode } from "react";

import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

export interface EgThemeProviderProps extends ThemeProviderProps {
  children: ReactNode;
}

const EgThemeProvider: FC<EgThemeProviderProps> = ({
  theme,
  children,
  ...other
}) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme} {...other}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </StyledEngineProvider>
);

export default EgThemeProvider;
