import React from "react";
import { Meta, Story } from "@storybook/react";

import FileList, {
  FileListProps,
} from "@eGroupAI/material-module/infocenter/product/FileList";

export default {
  title: "Infocenter/Product/FileList",
  component: FileList,
} as Meta;

const items = [
  {
    uploadFileId: "99f3963f2633443e918d49a7c3f32fb5",
    uploadFileName: "UF-1 Pro flyer_zh.pdf",
    uploadFileExtensionName: "pdf",
    uploadFilePath:
      "https://cdn.egroup-infocenter.com/resources/organizations/e50f9329bccc4193b0c6236f5c862d3f/files/SERVICE_CMS/UF-1 Pro flyer_zh_20220220045109.pdf",
    uploadFileCreateDate: "Feb 20, 2022 4:51:10 AM",
    uploadFileCreateDateString: "2022-02-20T04:51:10.000Z",
    uploadFileSize: 4303.5556640625,
    uploadFilePathType: "SERVICE_CMS",
    uploadFileTargetCreateDate: "Feb 20, 2022 4:51:10 AM",
    uploadFileTargetCreateDateString: "2022-02-20T04:51:10.000Z",
  },
  {
    uploadFileId: "bafec95f2bc24fdfb61667bb082fd7b6",
    uploadFileName: "UF-1 Pro flyer.pdf",
    uploadFileExtensionName: "pdf",
    uploadFilePath:
      "https://cdn.egroup-infocenter.com/resources/organizations/e50f9329bccc4193b0c6236f5c862d3f/files/SERVICE_CMS/UF-1 Pro flyer_20220220045149.pdf",
    uploadFileCreateDate: "Feb 20, 2022 4:51:49 AM",
    uploadFileCreateDateString: "2022-02-20T04:51:49.000Z",
    uploadFileSize: 4256.6005859375,
    uploadFilePathType: "SERVICE_CMS",
    uploadFileTargetCreateDate: "Feb 20, 2022 4:51:50 AM",
    uploadFileTargetCreateDateString: "2022-02-20T04:51:50.000Z",
  },
];

export const Default: Story<FileListProps> = () => (
  <FileList
    items={items.map((el) => ({
      id: el.uploadFileId,
      date: el.uploadFileCreateDateString,
      tagName: "MANUAL",
      name: el.uploadFileName,
      // change size from kb to bytes
      size: el.uploadFileSize * 1000,
      previewUrl: el.uploadFilePath,
      shareUrl: el.uploadFilePath,
    }))}
  />
);
