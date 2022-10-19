import { ReactNode } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { SWRResponse } from "swr";
import { SWRInfiniteResponse } from "swr/infinite";

export interface PathParams {
  [key: string]: string | undefined;
}

export interface ReturnedValues<Data, ErrorData> {
  data?: Data;
  mutate: SWRResponse<AxiosResponse<Data>, AxiosError<ErrorData>>["mutate"];
  response?: AxiosResponse<Data>;
  error?: AxiosError<ErrorData>;
  isError: boolean;
  key: string | null;
  isValidating: boolean;
}

export interface ReturnedInfiniteValues<Data, ErrorData>
  extends Omit<
    ReturnedValues<Data, ErrorData>,
    "data" | "mutate" | "response" | "key"
  > {
  data?: Data[];
  mutate: SWRInfiniteResponse<
    AxiosResponse<Data>,
    AxiosError<ErrorData>
  >["mutate"];
  response?: AxiosResponse<Data>[];
  setSize: SWRInfiniteResponse["setSize"];
  size: SWRInfiniteResponse["size"];
}

export interface EntityList<T> {
  total: number;
  source: T[];
}

export interface FeedbackType {
  feedbackTypeId: string;
  feedbackTypeColor: string;
  feedbackTypeName: string;
  feedbackTypeCreateDateString: string;
  feedbackTypeUpdateDateString: string;
}

export interface CreateFeedbackApiPayload {
  organizationFeedbackCountry?: string;
  organizationFeedbackCompanyName?: string;
  organizationFeedbackPersonName: string;
  organizationFeedbackPersonEmail: string;
  organizationFeedbackPersonPhone?: string;
  organizationFeedbackTitle: string;
  organizationFeedbackContent: string;
  feedbackType?: {
    feedbackTypeId: string;
  };
  organizationFeedbackFilePathList?: string[];
  organizationTagList?: {
    tagId: string;
  }[];
}

export interface UploadFilesApiPayload<ServiceModuleValue> {
  files: File[];
  filePathType: ServiceModuleValue;
  targetId?: string;
}

export interface UploadOrgFilesApiPayload<ServiceModuleValue> {
  organizationId: string;
  files: File[];
  filePathType?: ServiceModuleValue;
  imageSizeType?: "PC" | "MOBILE" | "NORMAL";
  eGroupService?: "WEBSITE";
}

export interface SearchRecord {
  searchTextRecordReturnType: "HISTORY" | "AUTOCOMPLETE";
  searchTextRecordList: {
    searchTextRecordQuery: string;
  }[];
}

export interface SearchResult {
  searchId: string;
  searchTitle: string;
  searchContent: string;
  searchServiceModule: string;
  searchCreateDate: string;
  searchUpdateDate: string;
  searchHighlightContent?: string;
}

export interface ReportData {
  name?: string;
  total: number;
}

export interface Creator {
  loginId: string;
  memberName: string;
}

export interface Organization {
  organizationId: string;
  organizationCreateDateString: string;
  organizationName: string;
  creator: Creator;
}

export interface Report {
  reportId: string;
  reportType: string;
  reportIcon?: string;
  reportTitle: string;
}

export interface OrganizationReport {
  organization: Organization;
  report: Report;
  organizationReportNo: number;
}

export interface OrganizationReportAnalytics {
  reportId: string;
  reportType: "COUNT" | "SIMPLE_PIE" | "SIMPLE_LINE" | "SIMPLE_BAR";
  reportIcon?: string;
  reportTitle: string;
  reportData: ReportData[];
}

export interface Data {
  name: string;
  value: string;
}

export interface FilterCondition {
  filterKey: string;
  filterName?: string;
  filterIcon?: string;
  type: string;
  dataList?: Data[];
  columnId?: string;
  targetType?: string;
  singleLayerTagServiceModuleValue?: string;
  multiLayerTagServiceModuleValue?: string;
  reviewServiceModuleValue?: string;
  noTargetRelationValue?: string[];
  serviceModuleId?: string;
  loginId?: string;
}

export interface FilterConditionGroup {
  filterConditionGroupName: "static" | "dynamic" | "releation";
  filterConditionList: FilterCondition[];
}

export enum ColumnType {
  CHOICE_MULTI = "CHOICE_MULTI",
  CHOICE_ONE = "CHOICE_ONE",
  DATE = "DATE",
  DATETIME = "DATETIME",
  TEXT = "TEXT",
}

export enum DateRangeLimit {
  DISABLE_FEATURE = "DISABLE_FEATURE",
  DISABLE_PAST = "DISABLE_PAST",
}

export interface TableColumn {
  id: number;
  columnName: string;
  isSort: 0 | 1;
  sortKey?: string;
  // For table
  isTable?: 0 | 1;
  // For edit column
  isEdit?: 0 | 1;
  isEditFix?: 0 | 1;
  columnType_?: ColumnType;
  dateRangeLimit_?: DateRangeLimit;
  verifyType_?: string;
  keyValueMap?: {
    [label: string]: string;
  };
}

export interface OrganizationRole {
  organizationRoleId: string;
  organization: Organization;
  organizationRoleCreateDateString: string;
  organizationRoleUpdateDateString: string;
  organizationRoleNameZh: string;
  organizationRoleNameEn?: string;
  organizationRoleStatus: number;
  organizationRoleFix: number;
  organizationRoleAdmin: number;
  serviceModule: ServiceModule;
}

export interface OrganizationMember {
  organization: Organization;
  member: Member;
  organizationRoleList: OrganizationRole[];
}

export interface Member {
  loginId: string;
  memberCreateDateString: string;
  memberUpdateDateString: string;
  memberAccount: string;
  memberName: string;
  memberEmail: string;
  memberAccountStatus: string;
  memberPhone: string;
  isDelete: number;
}

export enum Locale {
  EN_US = "en_US",
  ZH_TW = "zh_TW",
}

export interface FilterSearch {
  startIndex?: number;
  size?: number;
  query?: string;
  equal?: Equal[];
  range?: Range[];
  sort?: Sort;
  locale?: Locale;
}

export interface Equal {
  filterKey: string;
  value: string[];
}

export interface Range {
  filterKey: string;
  from: string;
  to: string;
}

export interface Sort {
  sortKey: string;
  order: string;
}

export interface OrganizationMemberRole {
  organizationMemberRoleId: string;
  organizationRole: OrganizationRole;
  organizationMember: OrganizationMember;
  organizationMemberRoleCreateDateString: string;
  organizationMemberRoleUpdateDateString: string;
  organizationRoleModulePermissionList: ModulePermission[];
}

export interface ServiceModule {
  serviceModuleId: string;
  serviceMainModule: ServiceMainModule;
  serviceModuleCreateDateString: string;
  serviceModuleUpdateDateString: string;
  serviceModuleNameZh: string;
  serviceModuleNameEn: string;
  serviceModuleValue: string;
  serviceModuleStandard: number;
  serviceModulePermissionList: ModulePermission[];
  serviceModuleNo: number;
}

export interface ServiceMainModule {
  serviceMainModuleId: string;
  serviceMainModuleNameZh: string;
  serviceMainModuleNameEn: string;
  serviceModuleList?: ServiceModule[];
}

export interface OrganizationModule {
  organizationModuleId: string;
  organization: Organization;
  serviceMainModule: ServiceMainModule;
  organizationModuleCreateDateString: string;
  organizationModuleUpdateDateString: string;
}

export interface OrganizationRoleModule {
  organizationRoleModuleId: string;
  organizationRole: {
    organizationRoleId: string;
  };
  serviceModule: {
    serviceModuleId: string;
  };
  organizationRoleModuleCreateDateString: string;
  organizationRoleModuleUpdateDateString: string;
  organizationRoleModulePermissionList: ModulePermission[];
}

export type ServiceModuleMap =
  | {
      [key: string]: ModulePermission[];
    }
  | Record<string, never>;

export type ModuleRouteMapping<K extends string> = {
  [key in K]: string[];
};

export interface Route {
  path?: string;
  breadcrumbName?: string;
  menuIcon?: ReactNode;
  collapse?: boolean;
  routes?: Route[];
}

export enum ModulePermission {
  READ = "READ",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  UPDATE_ALL = "UPDATE_ALL",
  DELETE = "DELETE",
  DELETE_ALL = "DELETE_ALL",
  LIST = "LIST",
  COMMENT = "COMMENT",
  AUTH = "AUTH",
  SUBMIT_REVIEW = "SUBMIT_REVIEW",
  AUDIT = "AUDIT",
}

export enum ServiceModulePermissionMapping {
  LIST = "瀏覽所有資料",
  READ = "瀏覽被授權資料",
  CREATE = "新增",
  UPDATE = "修改",
  UPDATE_ALL = "修改全部",
  DELETE = "刪除",
  DELETE_ALL = "刪除全部",
  COMMENT = "評論",
  SUBMIT_REVIEW = "提交審核",
  AUDIT = "審核",
  AUTH = "授權",
}
