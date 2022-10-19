import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";

import FullTextSearch, {
  FullTextSearchProps,
} from "@eGroupAI/material-lab/FullTextSearch";
import useMemberOrgSearchRecords from "@eGroupAI/hooks/apis/useMemberOrgSearchRecords";
import { Paper } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

export default {
  title: "Lab/FullTextSearch",
  component: FullTextSearch,
} as Meta;

export const Default: Story<FullTextSearchProps> = (args) => {
  const { data, isValidating } = useMemberOrgSearchRecords();
  const [text, setText] = useState("");

  return (
    <>
      {text}
      <br />
      <FullTextSearch
        loading={isValidating}
        onChange={(e, value) => {
          if (value !== "") {
            setText(value);
          }
        }}
        onInputChange={(e) => {
          if (e.target.value !== "") {
            setText(e.target.value);
          }
        }}
        style={{ maxWidth: 250 }}
        {...args}
        optionType={
          data?.searchTextRecordReturnType === "HISTORY" ? "record" : "search"
        }
        options={
          data?.searchTextRecordList.map((el) => el.searchTextRecordQuery) || []
        }
      />
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: "0",
      background: "#f8f9fc",
      fontSize: "0.85rem",
      color: "#6e707e",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#bac8f3",
      boxShadow: "0 0 0 0.2rem rgb(78 115 223 / 25%)",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#bac8f3",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "0",
    },
    "& .MuiInputBase-input": {
      paddingLeft: 16,
    },
  },
}));

export const WithStyled: Story<FullTextSearchProps> = (args) => {
  const classes = useStyles();

  return (
    <Paper style={{ padding: 8 }}>
      <FullTextSearch
        className={classes.root}
        variant="outlined"
        placeholder="搜尋......"
        type="text"
        style={{ maxWidth: 250 }}
        {...args}
        optionType="record"
        options={[]}
      />
    </Paper>
  );
};
