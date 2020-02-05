return require('yargs')
  .option('verbose', {
    description: 'Verbose output',
    boolean: true
  })
  .option('silent', {
    description: 'Silent output',
    boolean: true
  })
  .command('up', 'Start the containers', require('./commands/up'))
  .command('down', 'Stop the containers', require('./commands/down'))
  .command('restart', 'Restart the containers', require('./commands/restart'))
  .command('install', 'Installs and provisions the compose stack', require('./commands/install'))
  .demandCommand(1, 'Please, specify a command.')
  .help()
  .strict()
  .argv;
