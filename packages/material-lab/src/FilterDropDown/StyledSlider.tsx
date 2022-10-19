import { Slider } from "@mui/material";

import { styled } from "@mui/material/styles";

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.egPalette.primary[1],
  height: 8,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-valueLabel": {
    left: "calc(-50% + 4px)",
  },
  "& .MuiSlider-track": {
    height: 8,
    borderRadius: 4,
  },
  "& .MuiSlider-rail": {
    height: 8,
    borderRadius: 4,
  },
}));

export default StyledSlider;
