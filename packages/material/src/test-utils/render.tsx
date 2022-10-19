import React, { ComponentType, ReactElement } from "react";
import {
  render as testingRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import StylesProvider from "@mui/styles/StylesProvider";
import { GenerateId } from "jss";
import createEgTheme from "../stylesheet/createEgTheme";

const generateClassName: GenerateId = (rule, sheet) =>
  `${sheet?.options.classNamePrefix}-${rule.key}`;

const egTheme = createEgTheme();

export default function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult {
  const AllProviders = ({ children }) => (
    <StylesProvider generateClassName={generateClassName}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={egTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  );

  return testingRender(ui, {
    wrapper: AllProviders as ComponentType,
    ...options,
  });
}
