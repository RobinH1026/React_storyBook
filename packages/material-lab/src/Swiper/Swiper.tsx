import React, { FC } from "react";
import { Pagination, Navigation, Autoplay } from "swiper";
import {
  Swiper as ReactSwiper,
  SwiperProps as ReactSwiperProps,
} from "swiper/react";

export type SwiperProps = ReactSwiperProps;

const Swiper: FC<SwiperProps> = (props) => (
  <ReactSwiper modules={[Pagination, Navigation, Autoplay]} {...props} />
);

export default Swiper;
