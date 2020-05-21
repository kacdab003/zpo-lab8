module.exports = {
  verbose: true,
  globals: {
    NODE_ENV: 'test',
  },
  setupFiles: ['./setupTests.js'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
};
