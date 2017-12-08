require('./check-versions')();
const chalk = require('chalk');

const webpack = require("webpack");
const path = require("path");

const config = {
  context: path.resolve(__dirname, "../"),
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "plone-vue.js",
    library: "plone-vue",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: ["./src"]
      }
    ]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  }
};

webpack(config, (err, stats) => {
  if (err) throw err;
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n");

  if (stats.hasErrors()) {
    console.log(chalk.red("  Build failed with errors.\n"));
    process.exit(1);
  }

  console.log(chalk.cyan("  Build complete.\n"));
});
