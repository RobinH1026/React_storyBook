import React, { FC } from "react";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import clsx from "clsx";
import hljs from "highlight.js";

import "highlight.js/styles/github.css";

const styles = createStyles({
  code: {
    display: "block",
    padding: ".5em",
    overflowX: "auto",
    background: "#f8f8f8",
  },
});

export interface HighlightProps extends WithStyles<typeof styles> {
  code: string;
  type: string;
}

const Highlight: FC<HighlightProps> = (props) => {
  const { classes, code, type } = props;
  const highlightCode = (code: string) => hljs.highlightAuto(code).value;
  return (
    <pre>
      <code
        className={clsx(type, classes.code)}
        dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
      />
    </pre>
  );
};

export default withStyles(styles)(Highlight);
