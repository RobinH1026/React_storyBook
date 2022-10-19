import React, { FC } from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    "& em": {
      color: "red",
    },
  },
}));

export interface SearchHighlightContentProps {
  content: string;
}

const SearchHighlightContent: FC<SearchHighlightContentProps> = ({
  content,
}) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default SearchHighlightContent;
