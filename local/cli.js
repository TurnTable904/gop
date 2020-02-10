const yargs = require('yargs');
const getMissingDeps = require('./helpers/get-missing-deps');

return (async () => {
  const missingDeps = await getMissingDeps();

  if (missingDeps.length) {
    process.stderr.write(
      `FATAL: Missing dependencies: ${missingDeps.join(', ')}\n`
    );
    return process.exit(1);
  }

  return yargs
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
    .command('rebuild', 'Rebuild the containers', require('./commands/rebuild'))
    .command('local-serve', 'Serve front locally', require('./commands/local-serve'))
    .command('install', 'Installs and provisions the compose stack', require('./commands/install'))
    .demandCommand(1, 'Please, specify a command.')
    .help()
    .strict()
    .argv;
})();
