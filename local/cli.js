return require('yargs')
  .option('verbose', {
    description: 'Verbose output',
    boolean: true
  })
  .option('silent', {
    description: 'Silent output',
    boolean: true
  })
  .command('up', 'Start the server', require('./commands/up'))
  .command('down', 'Stop the server', require('./commands/down'))
  .command('install', 'Installs and provisions the server', require('./commands/install'))
  .demandCommand(1, 'Please, specify a command.')
  .help()
  .strict()
  .argv;
