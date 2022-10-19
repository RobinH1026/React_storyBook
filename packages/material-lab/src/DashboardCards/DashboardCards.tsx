import { Grid } from "@mui/material";
import React, { FC } from "react";
import { IconName } from "../CountCard";
import DashboardCard, { ReportType } from "../DashboardCard";

export interface Report {
  organizationId: string;
  reportId: string;
  reportTitle: string;
  reportType: ReportType;
  reportNo: number;
  reportIcon: IconName;
}

export interface DashboardCardsProps {
  reports: Report[];
}

const DashboardCards: FC<DashboardCardsProps> = (props) => {
  const { reports } = props;

  return (
    <Grid container spacing={2}>
      {reports
        .sort((a, b) => a.reportNo - b.reportNo)
        .map((el) => {
          const isCount = el.reportType === "COUNT";
          return (
            <Grid
              key={el.reportId}
              item
              xs={12}
              sm={isCount ? 6 : 12}
              md={isCount ? 3 : 6}
            >
              <DashboardCard
                organizationId={el.organizationId}
                reportId={el.reportId}
                reportType={el.reportType}
                reportTitle={el.reportTitle}
                reportIcon={el.reportIcon}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default DashboardCards;
