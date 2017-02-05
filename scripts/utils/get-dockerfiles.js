const { ls } = require('shelljs');

const not = fn => (...args) => !fn(...args);
const isDockerfile = file => file === 'Dockerfile';

module.exports = function getDockerfiles(path) {
  const files = ls(path);

  return files
    .filter(isDockerfile)
    .concat(...files
      .filter(not(isDockerfile))
      .map(file => getDockerfiles(`${path}/${file}`)))
    .map(file => {
      if (file.startsWith(path)) {
        return file;
      }
      return `${path}/${file}`;
    });
};
