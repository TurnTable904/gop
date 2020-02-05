const exec = require('../lib/exec');

module.exports = {
  title: 'Purging Docker containers',
  task: () => exec('docker-compose', ['down', '-v', '--rmi=all'])
};

