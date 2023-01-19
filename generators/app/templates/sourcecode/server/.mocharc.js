module.exports = {
  timeout: 999999,
  colors: true,
  recursive: true,
  fullTrace: true,
  bail: true,
  spec: 'src/server/**/*.spec.ts',
  require: ['ts-node/register', 'tsconfig-paths/register', 'source-map-support/register'],
};
