const { dirname } = require('path');

const { exec, exit } = require('shelljs');

const { version } = require('./utils/argv');
const getDockerFiles = require('./utils/get-dockerfiles');

let code = 0;
const dirs = getDockerFiles(version)
  .map(dirname)
  .filter(dir => !dir.endsWith('onbuild'));

for (const dir of dirs) {
  ({ code } = exec(`docker build --no-cache ${dir}`));

  if (code !== 0) {
    break;
  }
}

exit(code);
