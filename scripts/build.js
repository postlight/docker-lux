const { sep, dirname } = require('path');

const { exec, exit } = require('shelljs');

const { latest, version } = require('./utils/argv');
const getDockerFiles = require('./utils/get-dockerfiles');

const NAME = 'zacharygolba/lux-framework';

let code = 0;
const dirs = getDockerFiles(version).map(dirname);

for (const dir of dirs) {
  const tag = `${NAME}:${dir.split(sep).join('-')}`;
  let tags = `-t ${tag}`;

  if (latest) {
    tags += ` -t ${tag.replace(version, 'latest')}`;
  }

  ({ code } = exec(`docker build ${tags} --no-cache ${dir}`));

  if (code !== 0) {
    break;
  }
}

exit(code);
