const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  outputDir: "docs", // for github pages
  publicPath: "./",
  pwa: {
    themeColor: "purple",
    manifestOptions: {
      icons: [
        {
          src: "img/icons/app_icon.png",
          sizes: "750x750",
          type: "image/png",
        },
      ],
    },
  },
  transpileDependencies: [
    "vuetify",
  ],
});
