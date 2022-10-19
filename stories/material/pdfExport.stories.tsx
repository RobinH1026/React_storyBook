import React from "react";
import { Meta, Story } from "@storybook/react";

import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Button from "@eGroupAI/material/Button";
import PdfPrintBox from "@eGroupAI/material/PdfPrintBox";
import PdfToolsbar from "@eGroupAI/material/PdfToolsbar";
import PdfContainer from "@eGroupAI/material/PdfContainer";
import PdfHeader from "@eGroupAI/material/PdfHeader";
import PdfFooter from "@eGroupAI/material/PdfFooter";
import useMediaPrint from "@eGroupAI/hooks/useMediaPrint";

export default {
  title: "Components/PdfExport",
} as Meta;

const useStyles = makeStyles({
  button: {
    marginLeft: 8,
  },
});

export const Default: Story = () => {
  const classes = useStyles();
  const { itemRefs, handleMediaPrint, handleSavePdf } =
    useMediaPrint("pdf-print-box");

  return (
    <>
      <PdfPrintBox id="pdf-print-box" />
      <PdfToolsbar>
        <Button
          className={classes.button}
          variant="contained"
          disableElevation
          onClick={handleMediaPrint}
          startIcon={<PrintIcon />}
        >
          Print
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => handleSavePdf("test.pdf")}
          startIcon={<PictureAsPdfIcon />}
        >
          Download PDF
        </Button>
      </PdfToolsbar>
      <PdfContainer
        ref={(ref) => {
          if (ref) {
            itemRefs.current.push(ref);
          }
        }}
      >
        <PdfHeader>
          <Typography variant="h5">PDF export title</Typography>
        </PdfHeader>
        PDF content Here
        <Grid container>
          <Grid item xs={6}>
            item
          </Grid>
          <Grid item xs={6}>
            item
          </Grid>
          <Grid item xs={12}>
            item
          </Grid>
        </Grid>
        <div style={{ height: 1920 }} />
        <br />
        test more than one page
        <Grid container>
          <Grid item xs={6}>
            item
          </Grid>
          <Grid item xs={6}>
            item
          </Grid>
          <Grid item xs={12}>
            item
          </Grid>
        </Grid>
        <PdfFooter>
          <Typography variant="body2">eGroupAI</Typography>
          <div style={{ flexGrow: 1 }} />
          <Typography variant="body2" align="right">
            All right reserved.
          </Typography>
        </PdfFooter>
      </PdfContainer>
    </>
  );
};
