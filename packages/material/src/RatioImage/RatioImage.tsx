import React, { forwardRef, CSSProperties, ImgHTMLAttributes } from "react";

import calcPaddingTop from "@eGroupAI/utils/calcPaddingTop";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const isBrowser = typeof document !== "undefined";

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    paddingTop: (props: RatioImageProps) =>
      calcPaddingTop(props.ratio || "16:9"),
  },
  content: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    overflow: "hidden",
  },
  useObjectFit: {
    width: "100%",
    objectFit: (props: RatioImageProps) => props.fit || "contain",
  },
  fixedObjectFit: {
    width: "100%",
    height: "100%",
    backgroundImage: (props: RatioImageProps) => `url(${props.src})`,
    backgroundSize: (props: RatioImageProps) => props.fit || "contain",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  },
}));
export interface RatioImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image object fit.
   */
  fit?: CSSProperties["objectFit"];
  /**
   * Image ratio
   */
  ratio?: string;
  /**
   * root img classname
   */
  imgClassName?: string;
  alt: string;
}

const RatioImage = forwardRef<HTMLImageElement, RatioImageProps>(
  (props, ref) => {
    const classes = useStyles(props);
    const { className, imgClassName, ratio, src, fit, style, alt, ...other } =
      props;
    const supportObjectFit =
      isBrowser &&
      !(
        document.documentElement.style.objectFit === undefined ||
        "objectFit" in document.documentElement.style === false
      );

    const renderContent = () => {
      if (supportObjectFit) {
        return (
          <img
            ref={ref}
            className={clsx(imgClassName, classes.useObjectFit)}
            src={src}
            alt={alt}
            height="100%"
            {...other}
          />
        );
      }
      return (
        <div
          className={clsx(imgClassName, classes.fixedObjectFit)}
          {...other}
        />
      );
    };

    return (
      <div className={className} style={style}>
        <div className={classes.container}>
          <div className={classes.content}>{renderContent()}</div>
        </div>
      </div>
    );
  }
);

export default RatioImage;
