const exec = require('../lib/exec');

module.exports = {
  title: 'Stopping containers',
  task: () => exec('docker-compose', ['down'])
};

