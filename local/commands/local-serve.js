const exec = require('../lib/exec');

module.exports.handler = async argv => {
  if (argv.verbose) {
    // TODO: Handle this
  } else if (argv.silent) {
    // TODO: Handle this
  }

  const subprocess = exec.in('front', 'npm', ['run', 'serve:dev', '--', '--progress=false'], {
    ENGINE_SECURE: '',
    ENGINE_HOST: 'localhost',
    ENGINE_PORT: '8080',
    NODE_OPTIONS: '--max_old_space_size=4096'
  });

  subprocess.stdout
    .pipe(process.stdout);

  subprocess.stderr
    .pipe(process.stderr);

  await subprocess;
};

module.exports.builder = {};
