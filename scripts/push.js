const { sep, dirname } = require('path');

const { exec, exit } = require('shelljs');

const { latest, version } = require('./utils/argv');
const getDockerFiles = require('./utils/get-dockerfiles');

const NAME = 'zacharygolba/lux-framework';

let code = 0;

for (const dir of getDockerFiles(version).map(dirname)) {
  const tag = `${NAME}:${dir.split(sep).join('-')}`;

  ({ code } = exec(`cd ${dir} && docker push ${tag}`));

  if (code !== 0) {
    break;
  }
}

if (latest) {
  ({ code } = exec(`cd ${version} && docker push ${NAME}:latest`));
}

exit(code);
