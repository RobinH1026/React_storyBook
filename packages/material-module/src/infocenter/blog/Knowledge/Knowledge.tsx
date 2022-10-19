import React, { FC } from "react";

import { makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";

import Grid from "@eGroupAI/material/Grid";
import Box from "@eGroupAI/material/Box";
import Button from "@eGroupAI/material/Button";
import Typography from "@eGroupAI/material/Typography";
import Link from "@eGroupAI/material/Link";

const FroalaEditorView = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg/FroalaEditorView"),
    ]);
    return values[0];
  },
  {
    loading: () => <div />,
    ssr: false,
  }
);

const useStyles = makeStyles((theme) => ({
  reviews: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none !important",

    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
      fontSize: "1rem",
    },
  },
}));

export interface KnowledgeProps {
  category?: string;
  primary?: string;
  author?: string;
  createDate?: string;
  visitsCount?: number;
  content?: string;
  prevUrl?: string;
  nextUrl?: string;
}

const Knowledge: FC<KnowledgeProps> = function (props) {
  const classes = useStyles();
  const {
    category,
    primary,
    author,
    createDate,
    visitsCount,
    content,
    prevUrl,
    nextUrl,
  } = props;
  const router = useRouter();

  return (
    <article>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            component="h3"
            variant="h4"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            {category}
          </Typography>
          <Typography component="h1" variant="h6" fontWeight={700} gutterBottom>
            {primary}
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <div>
              <Link variant="body2" href="/" sx={{ marginRight: 1 }}>
                {author}
              </Link>
              <Typography variant="body2" display="inline">
                {createDate}
              </Typography>
            </div>
            <Typography
              variant="body2"
              className={classes.reviews}
              color="primary"
            >
              <VisibilityIcon />
              {visitsCount}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FroalaEditorView model={content} />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={1}>
            <Button
              rounded
              variant="contained"
              color="primary"
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={() => {
                if (prevUrl) {
                  router.push(prevUrl);
                }
              }}
              disabled={!prevUrl}
            >
              上一篇
            </Button>
            <Button
              rounded
              variant="contained"
              color="primary"
              endIcon={<ChevronRightIcon />}
              onClick={() => {
                if (nextUrl) {
                  router.push(nextUrl);
                }
              }}
              disabled={!nextUrl}
            >
              下一篇
            </Button>
          </Box>
        </Grid>
      </Grid>
    </article>
  );
};

export default Knowledge;
