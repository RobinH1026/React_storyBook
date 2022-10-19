import React, { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";

export interface MultilineAreaProps extends TypographyProps {
  text?: string;
}

const MultilineArea: FC<MultilineAreaProps> = ({
  text,
  placeholder,
  ...other
}) => (
  <Typography {...other}>
    {text ? (
      <span
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: text.replace(/\n/g, "<br>"),
        }}
      />
    ) : (
      <Typography component="span" color="textSecondary">
        {placeholder}
      </Typography>
    )}
  </Typography>
);

export default MultilineArea;
