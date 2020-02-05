const Listr = require('listr');

module.exports.handler = async argv => {
  let renderer = 'default';

  if (argv.verbose) {
    renderer = 'verbose';
  } else if (argv.silent) {
    renderer = 'silent'
  }

  const tasks = new Listr([
    require('../tasks/stop'),
    require('../tasks/cleanup'),
    require('../tasks/provision-elasticsearch'),
    require('../tasks/install-minds'),
    require('../tasks/restart'),
  ], {
    renderer
  });

  await tasks.run();
};

module.exports.builder = {};
