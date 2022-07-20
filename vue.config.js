const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  outputDir: "docs", // for github pages
  transpileDependencies: [
    "vuetify",
  ],
});
