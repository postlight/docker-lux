const { sep, dirname } = require('path');

const { exec, exit } = require('shelljs');

const { latest, version } = require('./utils/argv');
const getDockerFiles = require('./utils/get-dockerfiles');

const NAME = 'zacharygolba/lux-framework';

let code = 0;
const dirs = getDockerFiles(version).map(dirname);

for (const dir of dirs) {
  const tag = `${NAME}:${dir.split(sep).join('-')}`;

  ({ code } = exec(`cd ${dir} && docker push ${tag}`));

  if (code !== 0) {
    break;
  }
}

if (latest && code === 0) {
  for (const dir of dirs) {
    const tag = `${NAME}:${['latest', ...dir.split(sep).slice(1)].join('-')}`;

    ({ code } = exec(`cd ${dir} && docker push ${tag}`));

    if (code !== 0) {
      break;
    }
  }
}

exit(code);
