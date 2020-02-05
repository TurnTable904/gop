const exec = require('../lib/exec');

module.exports = {
  title: 'Starting containers',
  task: () => exec('docker-compose', ['up', '-d', 'nginx'])
};

