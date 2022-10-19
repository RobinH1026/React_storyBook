import React, { FC } from "react";
import useOrgReportAnalytics from "@eGroupAI/hooks/apis/useOrgReportAnalytics";
import CountCard, { IconName } from "../CountCard";
import SimpleBarChart from "../SimpleBarChart";
import SimpleLineChart from "../SimpleLineChart";
import SimplePieChart from "../SimplePieChart";

export interface ReportData {
  name: string;
  total: number;
}

export type ReportType = "COUNT" | "SIMPLE_PIE" | "SIMPLE_LINE" | "SIMPLE_BAR";

export interface DashboardCardProps {
  organizationId: string;
  reportType: ReportType;
  reportId: string;
  reportTitle: string;
  reportIcon: IconName;
}

const DashboardCard: FC<DashboardCardProps> = (props) => {
  const { organizationId, reportId, reportType, reportTitle, reportIcon } =
    props;
  const { data, isValidating } = useOrgReportAnalytics({
    organizationId,
    reportId,
  });

  switch (reportType) {
    case "COUNT":
      return (
        <CountCard
          title={reportTitle}
          count={data?.reportData[0].total}
          loading={isValidating}
          iconName={reportIcon}
        />
      );
    case "SIMPLE_BAR":
      return (
        <SimpleBarChart
          title={reportTitle}
          data={data?.reportData}
          loading={isValidating}
        />
      );
    case "SIMPLE_LINE":
      return (
        <SimpleLineChart
          title={reportTitle}
          data={data?.reportData}
          loading={isValidating}
        />
      );
    case "SIMPLE_PIE":
      return (
        <SimplePieChart
          title={reportTitle}
          data={data?.reportData}
          loading={isValidating}
        />
      );
    default:
      return null;
  }
};

export default DashboardCard;
