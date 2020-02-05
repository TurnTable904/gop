const execa = require('execa');
const fs = require('fs');
const cwd = require('./cwd');

function exec(relativePath, file, arguments) {
  const workingDir = cwd(relativePath);

  if (!fs.existsSync(workingDir) || !fs.lstatSync(workingDir).isDirectory()) {
    throw new Error(`${workingDir} is not a directory`);
  }

  return execa(file, arguments, {
    cwd: workingDir,
  });
}

module.exports = (file, arguments) => {
  return exec('', file, arguments);
};

module.exports.in = exec;
