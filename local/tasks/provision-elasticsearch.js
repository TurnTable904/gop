const Listr = require('listr');
const exec = require('../lib/exec');

module.exports = {
  title: 'Provisioning ElasticSearch',
  task: () => new Listr([
    {
      title: 'Registering ElasticSearch 5.x indices',
      task: () => exec('docker-compose', ['up', 'elasticsearch-legacy-provisioner'])
    },
    {
      title: 'Registering ElasticSearch 6.x indices+',
      task: () => exec('docker-compose', ['up', 'elasticsearch-provisioner'])
    },
  ])
};
