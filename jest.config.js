module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  collectCoverage: true,
  collectCoverageFrom: ['!src/index.js', 'src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/src/index.js'],
};
