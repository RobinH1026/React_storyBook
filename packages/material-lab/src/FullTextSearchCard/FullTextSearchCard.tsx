import React, { FC, ReactNode } from "react";
import {
  CardHeader,
  CardContent,
  Link,
  LinkProps,
  CardProps,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as MuiIcons from "@mui/icons-material";
import StyledCard from "./StyledCard";
import SearchHighlightContent from "./SearchHighlightContent";

const useStyles = makeStyles(() => ({
  searchTitle: {
    fontSize: "1.25rem",
    marginBottom: "0.5rem",
    fontWeight: 700,
  },
}));

export interface FullTextSearchCardProps extends Omit<CardProps, "title"> {
  title: ReactNode;
  searchTitle: ReactNode;
  searchContent: string;
  icon: string;
  onSearchTitleClick?: LinkProps["onClick"];
}

const FullTextSearchCard: FC<FullTextSearchCardProps> = (props) => {
  const classes = useStyles();
  const {
    title,
    searchTitle,
    searchContent,
    onSearchTitleClick,
    icon,
    ...other
  } = props;
  const Icon = MuiIcons[icon];
  return (
    <StyledCard {...other}>
      <CardHeader title={title} avatar={<Icon />} />
      <CardContent>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className={classes.searchTitle} onClick={onSearchTitleClick}>
          {searchTitle}
        </Link>
        <SearchHighlightContent content={searchContent} />
      </CardContent>
    </StyledCard>
  );
};

export default FullTextSearchCard;
