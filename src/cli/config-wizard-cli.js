#!/usr/bin/env node

const yargs = require('yargs');

const {argv} = yargs
  .command(
    'babelrc',
    `generate a babelrc and install deps`,
    {
      edge: {
        default: 'cutting',
      },
      framework: {
        required: true,
      },
      support: {
        required: true,
      },
    },
    (argv) => {
      console.log(`babelrc command not currently supported`);
      process.exitCode = 1;
    }
  )
  .demandCommand(1, `Please specify a command`);

// console.log(argv);

