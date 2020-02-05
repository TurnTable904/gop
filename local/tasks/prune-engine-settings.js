const util = require('util');
const fs = require('fs');
const cwd = require('../lib/cwd');

const exists = util.promisify(fs.exists);
const rename = util.promisify(fs.rename);

module.exports = {
  title: 'Pruning engine settings script',
  task: async (ctx, task) => {
    const settingsPhp = cwd('engine', 'settings.php');

    if (await exists(settingsPhp)) {
      const newName = cwd('engine', `settings-${Date.now()}.php`);
      return await rename(settingsPhp, newName);
    } else {
      return task.skip('No settings.php file present')
    }
  }
};
