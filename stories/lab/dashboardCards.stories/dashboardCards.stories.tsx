import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import DashboardCards, {
  DashboardCardsProps,
  Report,
} from "@eGroupAI/material-lab/DashboardCards";
import data from "./data.json";

export default {
  title: "Lab/DashboardCards",
  component: DashboardCards,
} as Meta;

export const Default: Story<DashboardCardsProps> = () => (
  <DashboardCards
    reports={
      data.map((el) => ({
        ...el.report,
        organizationId: el.organization.organizationId,
        reportNo: el.organizationReportNo,
      })) as Report[]
    }
  />
);
