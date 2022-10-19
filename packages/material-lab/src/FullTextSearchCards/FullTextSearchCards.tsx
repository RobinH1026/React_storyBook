import React, { FC } from "react";
import { EntityList, SearchResult } from "@eGroupAI/typings/apis";
import { CircularProgress, Grid, Typography } from "@mui/material";
import Pagination, { PaginationProps } from "@mui/material/Pagination";
import FullTextSearchCard from "../FullTextSearchCard";

export interface FullTextSearchCardsProps {
  data?: EntityList<SearchResult>;
  size?: number;
  defaultPage?: number;
  onChange?: PaginationProps["onChange"];
  onSearchTitleClick?: (result: SearchResult) => void;
}

const FullTextSearchCards: FC<FullTextSearchCardsProps> = (props) => {
  const { data, size = 10, defaultPage, onChange, onSearchTitleClick } = props;

  if (!data) {
    return (
      <Grid container spacing={2} alignContent="center" justifyContent="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  if (data.total === 0) {
    return (
      <Grid container spacing={2} alignContent="center">
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Result is Empty
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      {data.source.map((el) => (
        <Grid item xs={12} key={el.searchId}>
          <FullTextSearchCard
            title="Title"
            searchTitle={el.searchTitle}
            searchContent={el.searchHighlightContent ?? el.searchContent}
            icon="ImportContacts"
            onSearchTitleClick={() => {
              if (onSearchTitleClick) {
                onSearchTitleClick(el);
              }
            }}
          />
        </Grid>
      ))}
      <Grid item>
        <Pagination
          showFirstButton
          showLastButton
          count={Math.ceil(data.total / size)}
          defaultPage={defaultPage}
          variant="outlined"
          shape="rounded"
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default FullTextSearchCards;
