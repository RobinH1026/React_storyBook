import React, { FC, ReactNode, Key } from "react";

import { useTheme, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "@eGroupAI/material/Link";
import Container from "@eGroupAI/material/Container";
import Typography from "@eGroupAI/material/Typography";
import Box, { BoxProps } from "@eGroupAI/material/Box";
import Grid from "@eGroupAI/material/Grid";
import Button from "@eGroupAI/material/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10rem 3rem 8rem 3rem",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.white,

    [theme.breakpoints.down("md")]: {
      padding: "6rem 3rem 6rem 3rem",
    },
  },
  item: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    marginBottom: "1rem",
  },
  moreLink: {
    display: "block",
  },
}));

export type Icon = {
  key: Key;
  src?: string;
  content?: string;
};

export interface FeatureSectionProps extends BoxProps {
  backgroundUrl: string;
  primary: ReactNode;
  description?: ReactNode;
  icons?: Icon[];
  side?: "left" | "right";
  moreLink?: string;
}

const FeatureSection: FC<FeatureSectionProps> = function (props) {
  const {
    backgroundUrl,
    primary,
    description,
    icons,
    side = "left",
    moreLink,
    ...other
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isLeft = side === "left";

  return (
    <Box
      className={classes.root}
      component="section"
      style={{ backgroundImage: `url('${encodeURI(backgroundUrl || "")}')` }}
      {...other}
    >
      <Container>
        <Grid container>
          {!isDownLg && !isLeft && <Grid item xs={12} lg={5} />}
          <Grid item xs={12} lg={7}>
            <Typography
              color="inherit"
              component="h3"
              variant="h3"
              fontWeight={600}
              gutterBottom
              align={isDownLg ? "center" : "left"}
            >
              {primary}
            </Typography>
            <Typography
              color="inherit"
              component="h4"
              variant="h6"
              sx={{
                mb: 2,
              }}
              align={isDownLg ? "center" : "left"}
            >
              {description}
            </Typography>
            <Grid container spacing={2}>
              {icons?.map((el) => (
                <Grid
                  key={el.key}
                  item
                  xs={6}
                  md={3}
                  sx={{ textAlign: isDownLg ? "center" : "left" }}
                >
                  <div className={classes.item}>
                    <div className={classes.image}>
                      {el.src && (
                        <Image
                          src={el.src}
                          width={137}
                          height={137}
                          unoptimized
                        />
                      )}
                    </div>
                    <Typography
                      variant="body2"
                      component="h5"
                      fontWeight={600}
                      color="white"
                    >
                      {el.content}
                    </Typography>
                  </div>
                </Grid>
              ))}
              {moreLink && (
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Link href={moreLink} target="_blank" underline="none">
                    <Button color="primary" variant="contained" rounded>
                      More
                    </Button>
                  </Link>
                </Grid>
              )}
            </Grid>
          </Grid>
          {isLeft && <Grid item xs={12} lg={5} />}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;
