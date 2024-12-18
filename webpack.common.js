const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Create html file in output directory with importing tags (building files)
const { ModuleFederationPlugin } = webpack.container; // For MicroFrontend
const deps = require("./package.json").dependencies;

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
    // Can add more entry point here for multiple bundling
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|woff(2)?|ttf|otf|eot|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./resource",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.html"),
      favicon: false,
      // favicon: './src/resource/image/favicon.png',
    }),
    // Preset environment variable while compiling
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    // For MicroFrontend
    new ModuleFederationPlugin({
      name: "remoteProduct",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductCount": "./src/component/ProductCount",
        "./ProductName": "./src/component/ProductName",
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};
