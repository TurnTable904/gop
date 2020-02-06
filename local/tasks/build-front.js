const Listr = require('listr');
const exec = require('../lib/exec');

module.exports = {
  title: 'Setting up front',
  task: () => new Listr([
    {
      title: 'Installing dependencies',
      task: () => exec.in('front', 'npm', ['install'])
    },
    {
      title: 'Building',
      task: () => exec.in('front', 'npm', ['run', 'build:dev', '--', '--watch=false'], {
        env: {
          ...process.env,
          NODE_OPTIONS: '--max_old_space_size=4096'
        }
      })
    },
  ])
};
