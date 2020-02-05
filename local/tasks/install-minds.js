const Listr = require('listr');
const exec = require('../lib/exec');

module.exports = {
  title: 'Installing Minds',
  task: () => new Listr([
    require('./start'),
    {
      title: 'Running installer',
      task: () => exec('docker-compose', ['up', 'installer'])
    },
  ])
};
