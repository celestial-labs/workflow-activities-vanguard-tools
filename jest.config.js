/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  transformIgnorePatterns: [],
  // transformIgnorePatterns: [
  //   "node_modules/(?!(@arcgis|@esri|@stencil/core|@vertigis|@vertigis-internal|@geocortex|@mui/material|@mui/system|@babel|node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)",
  // ],
};
