const exec = require('../lib/exec');

module.exports = {
  title: 'Shutting down',
  task: () => exec('docker-compose', ['down'])
};

