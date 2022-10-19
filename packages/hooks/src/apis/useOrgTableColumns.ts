import { TableColumn } from "@eGroupAI/typings/apis";
import makeGetHook from "./makeGetHook";
import { fetcher } from "./fetchers";

export type PathParams = {
  organizationId?: string;
  table: string;
};

const useOrgTableColumns = makeGetHook<TableColumn[], PathParams>(
  "/organizations/{{organizationId}}/column-list/{{table}}",
  fetcher,
  undefined,
  undefined,
  undefined,
  true
);
export default useOrgTableColumns;
