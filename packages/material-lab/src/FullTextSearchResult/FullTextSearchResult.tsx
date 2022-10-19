import React, { FC, ReactNode } from "react";
import { Tabs, Tab as MuiTab, Container } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@eGroupAI/material/Typography";
import useTab from "@eGroupAI/hooks/useTab";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(3),
    "& h1": {
      fontSize: "1.75rem",
      lineHeight: "1.2",
      color: "#5a5c69!important",
    },
  },
  shadow: {
    borderRadius: "0.35rem",
    boxShadow: "0 .15rem 1.75rem 0 rgba(58, 59, 69, .15)!important",
  },
  tabs: {
    background: "white",
    padding: "0 1.25rem",
    paddingTop: "0.3rem",
    marginBottom: theme.spacing(3),
    "& .MuiButtonBase-root": {
      padding: "0.5rem 1rem",
      minWidth: "unset",
      "& .MuiTab-wrapper": {
        fontWeight: "400",
        lineHeight: "1.5",
        textTransform: "none",
        fontSize: "1rem",
        fontFamily: "Nunito",
      },
    },
    "& .Mui-selected": {
      color: "#4e73df",
    },
    "& .MuiTabs-indicator": {
      height: "5px",
      backgroundColor: "#4e73df",
    },
    [theme.breakpoints.down("xl")]: {
      "& .MuiTabs-flexContainer": {
        flexWrap: "wrap",
        "& .MuiButtonBase-root": {
          width: "100%",
          maxWidth: "unset",
        },
        "& .Mui-selected": {
          borderBottom: "3px solid #4e73df",
        },
      },
      "& .MuiTabs-indicator": {
        display: "none",
      },
    },
  },
}));

export type Tab = {
  label: string;
  value: string;
};

export interface FullTextSearchResultProps {
  searchKey: string;
  defaultTabValue?: string;
  tabs: Tab[];
  onTabChange?: (value: string) => void;
  children: ReactNode;
}

const FullTextSearchResult: FC<FullTextSearchResultProps> = (props) => {
  const classes = useStyles();
  const { searchKey, defaultTabValue = 0, tabs, onTabChange, children } = props;
  const { value, handleChange } = useTab(
    "FullTextSearchResult",
    defaultTabValue
  );

  return (
    <Container maxWidth={false}>
      <div className={classes.pageTitle}>
        <Typography variant="h1" fontWeight={400}>
          <strong>{`"${searchKey}"`}</strong>的搜尋結果
        </Typography>
      </div>
      <Tabs
        value={value}
        className={clsx(classes.tabs, classes.shadow)}
        onChange={(_, value) => {
          if (onTabChange) {
            onTabChange(value);
          }
          handleChange(value);
        }}
      >
        {tabs.map((el) => (
          <MuiTab key={el.label} label={el.label} value={el.value} />
        ))}
      </Tabs>
      {children}
    </Container>
  );
};

export default FullTextSearchResult;
