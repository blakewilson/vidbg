module.exports = {
  roots: ["<rootDir>"],
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  preset: "jest-puppeteer",
  setupFiles: ["<rootDir>/tests/setup/setup.ts"],
  modulePathIgnorePatterns: ["<rootDir>/tests/setup"],
};
