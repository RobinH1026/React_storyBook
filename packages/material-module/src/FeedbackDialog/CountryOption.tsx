import React, { FC, HTMLAttributes } from "react";
import Box from "@eGroupAI/material/Box";

export interface CountryOptionProps extends HTMLAttributes<HTMLLIElement> {
  name: string;
  code: string;
}

const CountryOption: FC<CountryOptionProps> = ({ name, code, ...other }) => (
  <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...other}>
    <img
      loading="lazy"
      width="20"
      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
      alt={code}
    />
    {name} ({code})
  </Box>
);

export default CountryOption;
