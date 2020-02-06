const Listr = require('listr');
const util = require('util');
const fs = require('fs');
const rimraf = require('@alexbinary/rimraf');
const exec = require('../lib/exec');
const cwd = require('../lib/cwd');

const exists = util.promisify(fs.exists);
const rename = util.promisify(fs.rename);

module.exports = {
  title: 'Cleaning up',
  task: () => new Listr([
    {
      title: 'Purging containers',
      task: () => exec('docker-compose', ['down', '-v', '--rmi=all'])
    },
    {
      title: 'Pruning engine',
      task: async (ctx, task) => {
        const settingsPhp = cwd('engine', 'settings.php');

        if (await exists(settingsPhp)) {
          const newName = cwd('engine', `settings.php-${Date.now()}.bak`);
          await rename(settingsPhp, newName);
        } else {
          return task.skip('No settings.php file present')
        }
      }
    },
    {
      title: 'Pruning front',
      task: () => new Listr([
        {
          title: 'Removing node_modules',
          task: async (ctx, task) => {
            const nodeModulesFolder = cwd('front', 'node_modules');

            if (await exists(nodeModulesFolder)) {
              return await rimraf(nodeModulesFolder);
            } else {
              return task.skip('No node_modules directory present')
            }
          }
        },
        {
          title: 'Removing dist',
          task: async (ctx, task) => {
            const distFolder = cwd('front', 'dist');

            if (await exists(distFolder)) {
              return await rimraf(distFolder);
            } else {
              return task.skip('No dist directory present')
            }
          }
        },
      ])
    }
  ])
};
