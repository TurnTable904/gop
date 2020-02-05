const Listr = require('listr');

module.exports = {
  title: 'Cleaning up',
  task: () => new Listr([
    require('./shutdown'),
    require('./prune-engine-settings'),
    require('./purge-docker-volumes'),
  ])
};
