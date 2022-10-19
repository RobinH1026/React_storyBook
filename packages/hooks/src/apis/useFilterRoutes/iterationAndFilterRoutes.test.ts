import { Route } from "@eGroupAI/typings/apis";
import iterationAndFilterRoutes from "./iterationAndFilterRoutes";

describe("iterationAndFilterRoutes", () => {
  it("should iteration And Filter Routes.", () => {
    const availableRoutes = ["/me/cms", "/me/cms/home", "/me/cms/settings"];
    const availableRoutes2 = [];

    const routes: Route[] = [
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
            path: "/me/cms/solutions",
            breadcrumbName: "解決方案",
          },
          {
            path: "/me/cms/articles",
            breadcrumbName: "文章",
          },
          {
            path: "/me/cms/settings",
            breadcrumbName: "設定",
          },
        ],
      },
    ];

    const routes2: Route[] = [
      {
        breadcrumbName: "網站管理",
        collapse: true,
        path: "/me/cms/home",
      },
    ];

    const routes3: Route[] = [
      {
        breadcrumbName: "網站管理",
        collapse: true,
        path: "/me/cms",
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
            path: "/me/cms/solutions",
            breadcrumbName: "解決方案",
          },
          {
            path: "/me/cms/articles",
            breadcrumbName: "文章",
          },
          {
            path: "/me/cms/settings",
            breadcrumbName: "設定",
          },
        ],
      },
    ];

    const result = [
      {
        breadcrumbName: "網站管理",
        collapse: true,
        routes: [
          {
            path: "/me/cms/home",
            breadcrumbName: "首頁管理",
          },
          {
            path: "/me/cms/settings",
            breadcrumbName: "設定",
          },
        ],
      },
    ];

    const result2: Route[] = [
      {
        breadcrumbName: "網站管理",
        collapse: true,
        path: "/me/cms/home",
      },
    ];

    const result3 = [
      {
        breadcrumbName: "網站管理",
        collapse: true,
        path: "/me/cms",
        routes: [
          {
            path: "/me/cms/home",
            breadcrumbName: "首頁管理",
          },
          {
            path: "/me/cms/settings",
            breadcrumbName: "設定",
          },
        ],
      },
    ];

    const result4 = [
      {
        breadcrumbName: "網站管理",
        collapse: true,
        routes: [],
      },
    ];

    expect(iterationAndFilterRoutes(routes, availableRoutes)).toEqual(result);
    expect(iterationAndFilterRoutes(routes2, availableRoutes)).toEqual(result2);
    expect(iterationAndFilterRoutes(routes3, availableRoutes)).toEqual(result3);
    expect(iterationAndFilterRoutes(routes, availableRoutes2)).toEqual(result4);
  });
});
