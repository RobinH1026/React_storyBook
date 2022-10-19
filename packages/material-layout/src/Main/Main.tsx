import { styled } from "@mui/material/styles";

const Main = styled("main", {
  name: "MuiEgMain",
})(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(25),
  [theme.breakpoints.down("md")]: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(20),
  },
}));

export default Main;
