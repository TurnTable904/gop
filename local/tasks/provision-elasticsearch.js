const Listr = require('listr');
const exec = require('../lib/exec');

module.exports = {
  title: 'Provisioning ElasticSearch',
  task: () => new Listr([
    {
      title: 'Creating 5.x-compatible indices',
      task: () => exec('docker-compose', ['run', 'elasticsearch-legacy-provisioner'])
    },
    {
      title: 'Stopping 5.x container',
      task: () => exec('docker-compose', ['stop', 'elasticsearch-legacy'])
    },
    {
      title: 'Creating indices',
      task: () => exec('docker-compose', ['run', 'elasticsearch-provisioner'])
    },
  ])
};
