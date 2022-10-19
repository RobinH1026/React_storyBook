import React, { FC, useRef } from "react";
import {
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import html2canvas from "html2canvas";
import SectionHeader from "./SectionHeader";
import sortOptionCount from "../sortOptionCount";
import ResponseContentList from "../ResponseContentList";
import Charts from "../Charts";
import MultiBarChart from "./MultiBarChart";
import Table from "./Table";
import { Question } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "hidden",
    border: "1px solid #e3e6f0",
    boxShadow: theme.egShadows[3],
  },
  body: {
    padding: theme.spacing(2, 3),
  },
  decorate: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: theme.palette.primary.main,
  },
}));
export interface SectionProps {
  question: Question;
  totalResponses: number;
}

const Section: FC<SectionProps> = ({ question, totalResponses }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const ref = useRef<HTMLDivElement>(null);

  const handleDownloadImage = () => {
    if (ref && ref.current) {
      // https://stackoverflow.com/questions/36213275/html2canvas-does-not-render-full-div-only-what-is-visible-on-screen
      html2canvas(ref.current, { scrollY: -window.scrollY }).then((canvas) => {
        const uri = canvas.toDataURL();
        const filename = `${question.questionName}.png`;
        const link = document.createElement("a");
        if (typeof link.download === "string") {
          link.href = uri;
          link.download = filename;
          link.click();
        } else {
          window.open(uri);
        }
      });
    }
  };

  const renderContent = () => {
    switch (question.questionType) {
      case "text":
      case "textarea":
      case "email":
      case "date":
        return (
          <>
            <SectionHeader
              question={question}
              totalResponses={totalResponses}
              onDownloadImageClick={handleDownloadImage}
            />
            <ResponseContentList data={question.responseContentList} />
          </>
        );
      case "titleBlock":
        return (
          <>
            <div className={classes.decorate} />
            <Typography
              variant="h6"
              gutterBottom={question.questionDescription !== undefined}
            >
              {question.questionName}
            </Typography>
            <Typography>{question.questionDescription}</Typography>
          </>
        );
      case "choicemulti": {
        return (
          <>
            <SectionHeader
              question={question}
              totalResponses={totalResponses}
              onDownloadImageClick={handleDownloadImage}
            />
            {question.optionList ? (
              <MultiBarChart
                data={question.optionList.sort(sortOptionCount)}
                question={question}
              />
            ) : (
              <Typography variant="body1" align="center">
                No Data
              </Typography>
            )}
          </>
        );
      }
      default:
        return (
          <>
            <SectionHeader
              question={question}
              totalResponses={totalResponses}
              onDownloadImageClick={handleDownloadImage}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Table question={question} totalResponses={totalResponses} />
              </Grid>
              {!matches && (
                <Grid item xs={12} sm={6}>
                  <Charts question={question} />
                </Grid>
              )}
            </Grid>
          </>
        );
    }
  };

  /**
   * Disable rounded & boxshadow to fixed this issue
   * https://github.com/niklasvh/html2canvas/issues/1856
   */
  return (
    <Paper ref={ref} elevation={0} className={classes.root}>
      {renderContent()}
    </Paper>
  );
};

export default Section;
