const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  fakeTimers: {
    "enableGlobally": true
  },
    coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/security/crypt.js",
  ],
  verbose: true,
};

export default config;