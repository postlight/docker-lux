const { sep, dirname } = require('path');

const { exec, exit } = require('shelljs');

const { latest, version } = require('./utils/argv');
const getDockerFiles = require('./utils/get-dockerfiles');

const TAG_PREFIX = 'zacharygolba/lux-framework:';

let code = 0;

for (const file of getDockerFiles(version)) {
  const tag = TAG_PREFIX + dirname(file).split(sep).join('-');

  ({ code } = exec(`echo ${file} ${tag}`));

  if (code !== 0) {
    break;
  }
}

if (latest) {
  ({ code } = exec(`echo ${version} ${TAG_PREFIX + 'latest'}`));
}

exit(code);
