module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "react-app/jest",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["import", "@typescript-eslint"],
  rules: {
    curly: 1,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
        bundledDependencies: true,
      },
    ],
    // would be nice to enable these rules later, but they are too noisy right now
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
