import React, { forwardRef, HTMLAttributes } from "react";

import marked, { MarkedOptions } from "marked";
import hljs from "highlight.js";
import clsx from "clsx";
import { Theme } from "@mui/material";

import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      lineHeight: "2.2rem",
      fontFamily: theme.typography.fontFamily,
      "& pre code[class*='language-']": {
        display: "block",
        overflowX: "auto",
        padding: ".5em",
        color: "#333",
        background: "#f8f8f8",
      },
      "& img": {
        margin: "20px 0",
        boxShadow:
          "0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)",
      },
      "& hr": {
        height: "1px",
        margin: 0,
        border: "none",
        flexShrink: 0,
        backgroundColor: "rgba(0, 0, 0, 0.12)",
      },
      "& a": {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
      },
      "& h1": {
        fontSize: theme.typography.h5.fontSize,
        fontWeight: theme.typography.h5.fontWeight,
      },
      "& h2": {
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
      },
      "& h3": {
        marginBottom: "0.35em",
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: 500,
      },
      "& .table-container": {
        overflowX: "auto",
      },
      "& table": {
        display: "table",
        whiteSpace: "nowrap",
        width: "100%",
        borderCollapse: "collapse",
        borderSpacing: 0,
      },
      "& tbody": {
        display: "table-row-group",
        color: theme.palette.text.primary,
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
      },
      "& thead": {
        display: "table-header-group",
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightMedium,
      },
      "& tfoot": {
        display: "table-footer-group",
        borderBottom: 0,
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14),
      },
      "& tr": {
        color: "inherit",
        display: "table-row",
        height: 48,
        verticalAlign: "middle",
        // We disable the focus ring for mouse, touch and keyboard users.
        outline: "none",
      },
      "& td,th": {
        display: "table-cell",
        verticalAlign: "inherit",
        // Workaround for a rendering bug with spanned columns in Chrome 62.0.
        // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
        textAlign: "left",
        padding: "4px 56px 4px 24px",
        "&:last-child": {
          paddingRight: 24,
        },
      },
      // inner table style fixed
      "& table table tbody tr:last-child td": {
        borderBottom: 0,
      },
      "& table table": {
        marginBottom: 0,
      },
      "& table table td": {
        padding: 0,
      },
    },
  });

export const renderer = new marked.Renderer();

renderer.table = (header, body) => `
    <div class="table-container">
      <table>
        <thead>${header}</thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;

const defaultOptions = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
  renderer,
};

export interface MarkdownElementProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the MarkdownElement.
   */
  text: string;
  /**
   * Customer "marked" options.
   */
  markedOptions?: MarkedOptions;
}

const MarkdownElement = forwardRef<
  HTMLDivElement,
  MarkdownElementProps & WithStyles<typeof styles>
>((props, ref) => {
  const { classes, className, markedOptions: options, text, ...other } = props;

  return (
    <div
      ref={ref}
      className={clsx(classes.root, "markdown-body", className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: marked(text, {
          ...defaultOptions,
          ...options,
        }),
      }}
      {...other}
    />
  );
});

export default withStyles(styles, {
  name: "MuiEgMarkdownElement",
})(MarkdownElement);
