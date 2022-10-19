import React from "react";
import { Meta, Story } from "@storybook/react";

import makeStyles from "@mui/styles/makeStyles";
import Grid from "@eGroupAI/material/Grid";
import Typography from "@eGroupAI/material/Typography";
import IconButton from "@eGroupAI/material/IconButton";
import Container from "@eGroupAI/material/Container";
import Paper from "@eGroupAI/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import data from "./data.json";

export default {
  title: "Modules/CmsPageEditor",
} as Meta;

const useStyles = makeStyles({
  block: {
    marginBottom: 8,
    padding: "8px 16px",
  },
  toolbar: {
    display: "flex",
  },
  item: {
    width: 215,
  },
  img: {
    marginBottom: 8,
  },
});

export const Default: Story = () => {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.block}>
        <div className={classes.toolbar}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Security that starts from your finger-tip
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <Grid container spacing={2}>
          {data.map((el) => (
            <Grid item key={el.id}>
              <div className={classes.item}>
                <img className={classes.img} src={el.imgSrc} alt="thumb" />
                <Typography variant="h6" gutterBottom>
                  {el.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {el.detail}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Paper className={classes.block}>
        <div className={classes.toolbar}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Carousel
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <Grid container spacing={2}>
          {data.map((el) => (
            <Grid item key={el.id}>
              <div className={classes.item}>
                <img className={classes.img} src={el.imgSrc} alt="thumb" />
                <Typography variant="h6" gutterBottom>
                  {el.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {el.detail}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};
