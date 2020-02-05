const Listr = require('listr');
const exec = require('../lib/exec');

module.exports = {
  title: 'Installing Minds',
  task: () => new Listr([
    {
      title: 'Starting web server',
      task: () => exec('docker-compose', ['up', '-d', 'nginx'])
    },
    {
      title: 'Running installer',
      task: () => exec('docker-compose', ['up', 'installer'])
    },
  ])
};
