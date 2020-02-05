const exec = require('../lib/exec');

module.exports = {
  title: 'Installing Minds',
  task: () => exec('docker-compose', ['run', 'installer'])
};
