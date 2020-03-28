// babel.config.js
module.exports = {
  presets: [
    "@babel/preset-env",
    "@salesforce/babel-preset-design-system-react",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "root-import",
      {
        paths: [
          {
            rootPathPrefix: "~", // `~` is the default so you can remove this if you want
            rootPathSuffix: "src/"
          }
        ]
      }
    ]
  ]
};
