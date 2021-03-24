module.exports = {
  'transform': {
    '^.+\\.ts?$': 'ts-jest',
  },
  'testMatch': [ "**/?(*.)+(spec|test).ts" ],
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
};
