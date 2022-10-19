import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import makeStyles from "@mui/styles/makeStyles";
import Swiper, { SwiperProps } from "@eGroupAI/material-lab/Swiper";
import { SwiperSlide } from "swiper/react";
import RatioImage from "@eGroupAI/material/RatioImage";
import Button from "@eGroupAI/material/Button";
import Typography from "@eGroupAI/material/Typography";
import clsx from "clsx";
import useTheme from "@mui/material/styles/useTheme";

export default {
  title: "Lab/Swiper",
  component: Swiper,
} as Meta;

export const Default: Story<SwiperProps> = () => (
  <Swiper
    pagination={{
      type: "progressbar",
    }}
    navigation
  >
    <SwiperSlide>
      <RatioImage
        src="https://placeimg.com/1450/500/any"
        ratio="1450:500"
        alt=""
      />
    </SwiperSlide>
    <SwiperSlide>
      <RatioImage
        src="https://placeimg.com/1450/500/any"
        ratio="1450:500"
        alt=""
      />
    </SwiperSlide>
    <SwiperSlide>
      <RatioImage
        src="https://placeimg.com/1450/500/any"
        ratio="1450:500"
        alt=""
      />
    </SwiperSlide>
  </Swiper>
);

export const WithMultipleSlide: Story<SwiperProps> = () => (
  <Swiper
    slidesPerView={3}
    spaceBetween={30}
    slidesPerGroup={3}
    loop
    loopFillGroupWithBlank
    navigation
  >
    <SwiperSlide>
      <RatioImage
        src="https://placeimg.com/460/741/any"
        ratio="460:741"
        alt=""
      />
    </SwiperSlide>
    <SwiperSlide>
      <RatioImage
        src="https://placeimg.com/460/741/any"
        ratio="460:741"
        alt=""
      />
    </SwiperSlide>
    <SwiperSlide>
      <RatioImage
        src="https://placeimg.com/460/741/any"
        ratio="460:741"
        alt=""
      />
    </SwiperSlide>
  </Swiper>
);

const paddingBottom = "45px";

const useStyles = makeStyles({
  root: {
    "--swiper-navigation-color": "#000000",

    paddingLeft: 70,
    paddingRight: 70,
    paddingBottom,

    "& .swiper-button-prev, .swiper-button-next": {
      top: `calc(50% - ${paddingBottom})`,
    },

    "& .swiper-slide-active, .swiper-slide-active + div, .swiper-slide-active + div + div":
      {
        "& $mask": {
          background: "#000",
          opacity: 0.53,
        },
        "& $content": {
          opacity: 1,
        },
      },
  },
  slide: {
    position: "relative",
  },
  item: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  mask: {
    transition: "background 0.6s",
    background: "#fff",
    opacity: 0.28,
    zIndex: 1,
  },
  content: {
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    transition: "opacity 0.6s",
    opacity: 0,
    zIndex: 2,
  },
  btn: {
    maxWidth: "15rem",
    marginTop: "2rem",
  },
});

export const WithCustomStyle: Story<SwiperProps> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const slide = (
    <div className={classes.slide}>
      <div className={clsx(classes.item, classes.mask)} />
      <RatioImage
        src="https://placeimg.com/460/741/any"
        ratio="460:741"
        alt=""
      />
      <div className={clsx(classes.item, classes.content)}>
        <Typography variant="h4" align="center" gutterBottom color="white">
          Check-In System
        </Typography>
        <Typography variant="h6" align="center" color="white">
          The simplest Face Recognition
        </Typography>
        <Button
          className={classes.btn}
          fullWidth
          rounded
          variant="outlined"
          color="white"
        >
          More
        </Button>
      </div>
    </div>
  );
  return (
    <Swiper
      className={classes.root}
      slidesPerView={1}
      spaceBetween={20}
      navigation
      loop
      breakpoints={{
        [theme.breakpoints.values.sm]: {
          slidesPerView: 2,
        },
        [theme.breakpoints.values.lg]: {
          slidesPerView: 3,
        },
      }}
      pagination={{
        clickable: true,
      }}
    >
      <SwiperSlide>{slide}</SwiperSlide>
      <SwiperSlide>{slide}</SwiperSlide>
      <SwiperSlide>{slide}</SwiperSlide>
      <SwiperSlide>{slide}</SwiperSlide>
      <SwiperSlide>{slide}</SwiperSlide>
    </Swiper>
  );
};
