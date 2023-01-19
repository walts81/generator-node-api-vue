module.exports = {
  timeout: 999999,
  colors: true,
  recursive: true,
  fullTrace: true,
  bail: true,
  spec: 'src/client/**/*.spec.ts',
  extensions: ['ts'],
  require: ['ts-node/register', 'tsconfig-paths/register', 'source-map-support/register'],
};
