import { Popper } from "@mui/material";

import { styled } from "@mui/material/styles";

const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: `${theme.zIndex.snackbar + 1} !important`,
}));

export default StyledPopper;
