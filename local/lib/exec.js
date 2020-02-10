const execa = require('execa');
const fs = require('fs');
const cwd = require('./cwd');

function exec(relativePath, file, arguments, env = {}) {
  const workingDir = cwd(relativePath);

  if (!fs.existsSync(workingDir) || !fs.lstatSync(workingDir).isDirectory()) {
    throw new Error(`${workingDir} is not a directory`);
  }

  return execa(file, arguments, {
    cwd: workingDir,
    env: {
      ...process.env,
      ...env
    }
  });
}

module.exports = (file, arguments, env = {}) => {
  return exec('', file, arguments, env);
};

module.exports.in = exec;
