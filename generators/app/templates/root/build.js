#!/usr/bin/env node

const { build } = require('esbuild');
const { dependencies, peerDependencies } = require('./package.json');
const yargs = require('yargs');

yargs
  .scriptName('Project Builder')
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Building better TypeScript!',
    y => {
      y.positional('minify', {
        type: 'boolean',
        default: false,
        describe: 'Minify output?',
      });
    },
    argv => {
      build({
        entryPoints: ['src/server/src/app.ts'],
        bundle: true,
        minify: argv.minify,
        tsconfig: 'src/server/tsconfig.json',
        external: Object.keys(dependencies).concat(Object.keys(peerDependencies || {})),
        platform: 'node',
        outfile: argv.minify ? 'dist/app.min.js' : 'dist/app.js',
        sourcemap: argv.minify ? false : 'inline',
      });
    }
  )
  .help().argv;
