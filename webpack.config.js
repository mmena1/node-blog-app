var fs = require("fs");
var nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  entry: "./src/server/server.ts",
  output: {
    path: __dirname + "/dist",
    filename: "server.js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }]
  },
  target: "node",
  externals: nodeModules
};
