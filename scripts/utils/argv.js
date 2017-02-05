module.exports = require('yargs')
  .option('l', {
    type: 'boolean',
    alias: 'latest',
  })
  .option('v', {
    type: 'string',
    alias: 'version',
    demand: true,
  })
  .argv;
