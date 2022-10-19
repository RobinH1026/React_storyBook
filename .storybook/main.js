const path = require("path");

// Export a function. Accept the base config as the only param.

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../stories/**/*.stories.@(tsx|ts|jsx|js|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@storybook/addon-links",
    "@storybook/addon-interactions",   
    "storybook-addon-designs",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  typescript: {
    check: true,
  },
  staticDirs: ["../public"],
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.alias = {
      "@eGroupAI/material": path.resolve(
        __dirname,
        "../packages/material/src/"
      ),
      "@eGroupAI/material-form": path.resolve(
        __dirname,
        "../packages/material-form/src/"
      ),
      "@eGroupAI/material-formik": path.resolve(
        __dirname,
        "../packages/material-formik/src/"
      ),
      "@eGroupAI/material-icons": path.resolve(
        __dirname,
        "../packages/material-icons/src/"
      ),
      "@eGroupAI/material-intl": path.resolve(
        __dirname,
        "../packages/material-intl/src/"
      ),
      "@eGroupAI/material-lab": path.resolve(
        __dirname,
        "../packages/material-lab/src/"
      ),
      "@eGroupAI/material-layout": path.resolve(
        __dirname,
        "../packages/material-layout/src/"
      ),
      "@eGroupAI/material-module": path.resolve(
        __dirname,
        "../packages/material-module/src/"
      ),
      "@eGroupAI/material-router": path.resolve(
        __dirname,
        "../packages/material-router/src/"
      ),
      "@eGroupAI/devops": path.resolve(__dirname, "../packages/devops/src/"),
      "@eGroupAI/hooks": path.resolve(__dirname, "../packages/hooks/src/"),
      "@eGroupAI/testing-utils": path.resolve(
        __dirname,
        "../packages/testing-utils/src/"
      ),
      "@eGroupAI/utils": path.resolve(__dirname, "../packages/utils/src/"),
      "@eGroupAI/redux-modules": path.resolve(
        __dirname,
        "../packages/redux-modules/src/"
      ),
      "@eGroupAI/typings": path.resolve(
        __dirname,
        "../packages/typings/src/"
      ),
      stories: path.resolve(__dirname, "../stories/"),
    };

    // Return the altered config
    return config;
  },
};
