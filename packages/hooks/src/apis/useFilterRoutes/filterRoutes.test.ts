import { Route } from "@eGroupAI/typings/apis";
import filterRoutes from "./filterRoutes";

const moduleRouteMapping = {
  COMMON: ["/me"],
  ORGANIZATION: ["/me/org-info"],
  CMS_HOMEPAGE: ["/me/cms/home"],
  CMS_ABOUT_US: ["/me/cms/about"],
  CMS_PRODUCT: ["/me/cms/products", "/me/cms/products/[productId]"],
  CMS_SOLUTION: ["/me/cms/solutions"],
  CMS_BLOG: ["/me/cms/blogs"],
  EVENT: ["/me/events"],
};

const routes: Route[] = [
  {
    path: "/me/org-info",
    breadcrumbName: "單位管理",
  },
  {
    breadcrumbName: "網站管理",
    collapse: true,
    routes: [
      {
        path: "/me/cms/home",
        breadcrumbName: "首頁管理",
      },
      {
        path: "/me/cms/about",
        breadcrumbName: "關於我們",
      },
      {
        path: "/me/cms/products",
        breadcrumbName: "產品管理",
      },
      {
        path: "/me/cms/products/[productId]",
        breadcrumbName: "產品內容",
      },
      {
        path: "/me/cms/solutions",
        breadcrumbName: "解決方案",
      },
      {
        path: "/me/cms/blogs",
        breadcrumbName: "文章管理",
      },
      {
        path: "/me/cms/menu",
        breadcrumbName: "選單管理",
        routes: [
          {
            path: "/me/cms/menu/navbar",
            breadcrumbName: "導覽列選單管理",
          },
          {
            path: "/me/cms/menu/home",
            breadcrumbName: "首頁選單管理",
          },
          {
            path: "/me/cms/menu/product",
            breadcrumbName: "產品頁選單管理",
          },
          {
            path: "/me/cms/menu/blog",
            breadcrumbName: "文章頁選單管理",
          },
        ],
      },
    ],
  },
  {
    path: "/me/events",
    breadcrumbName: "事件管理",
  },
];

describe("filterRoutes", () => {
  it("should Filter Routes.", () => {
    const availableRoutes = ["COMMON", "ORGANIZATION", "EVENT", "CMS_PRODUCT"];

    expect(filterRoutes(moduleRouteMapping, routes, availableRoutes)).toEqual([
      {
        path: "/me/org-info",
        breadcrumbName: "單位管理",
      },
      {
        breadcrumbName: "網站管理",
        collapse: true,
        routes: [
          {
            path: "/me/cms/products",
            breadcrumbName: "產品管理",
          },
          {
            path: "/me/cms/products/[productId]",
            breadcrumbName: "產品內容",
          },
        ],
      },
      {
        path: "/me/events",
        breadcrumbName: "事件管理",
      },
    ]);
  });
});
