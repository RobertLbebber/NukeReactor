const { defaults } = require("jest-config");
module.exports = {
  // ...
  moduleFileExtensions: ["t.jsx"],
  modulePaths: ["src/components"],
  coverageDirectory: "src/coverage",
  collectCoverageFrom: ["**/*.{js,jsx}", "!**/node_modules/**", "!**/vendor/**"]
  // ...
};
