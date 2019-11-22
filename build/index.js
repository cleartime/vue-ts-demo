// vue.config.js
const path = require("path");
const NODE_ENV = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const mapPages = function() {
  process.env.BABEL_ENV = 0;
  const pages = {};
  ["home", "about"].forEach(item => {
    process.env.BABEL_ENV++;
    pages[item] = {
      entry: resolve("src/main.ts"),
      template: resolve("public/index.html"),
      filename: `${item}.html`,
      title: item,
      chunks: [`chunk-vendors-${item}`, `chunk-common-${item}`, item]
    };
  });
  return pages;
};

module.exports = {
  pages: NODE_ENV ? mapPages() : undefined
};
