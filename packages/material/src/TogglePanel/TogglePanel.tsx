import React, { ElementType, forwardRef, HTMLAttributes } from "react";

import clsx from "clsx";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";

const styles = createStyles({
  /* Styles applied to the root element if `index !== value`. */
  hide: {
    display: "none",
  },
});

export interface TogglePanelProps<Value = unknown>
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType;
  /**
   * Matched value. When the value is match show the content.
   */
  matchedValue: Value;
  /**
   * Current Value. Control panel status for show content.
   */
  value: Value;
  /**
   * How to implementation hide.
   */
  implementation?: "css" | "js";
}

const TogglePanel = forwardRef<
  HTMLDivElement,
  TogglePanelProps & WithStyles<typeof styles>
>((props, ref) => {
  const {
    className,
    component: Component = "div",
    classes,
    matchedValue,
    value,
    implementation = "css",
    ...other
  } = props;

  if (implementation === "js") {
    if (matchedValue !== value) {
      return null;
    }
    return <Component className={className} ref={ref} {...other} />;
  }

  return (
    <Component
      className={clsx(className, {
        [classes.hide]: matchedValue !== value,
      })}
      ref={ref}
      {...other}
    />
  );
});

export default withStyles(styles, {
  name: "MuiEgTogglePanel",
})(TogglePanel);
