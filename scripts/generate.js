const { stripIndent } = require('common-tags');
const { rm, ls, echo, mkdir } = require('shelljs');

const { version } = require('./utils/argv');

const main = base => stripIndent`
  FROM node:${base}

  RUN apt-get update && \\
      apt-get install -y \\
      build-essential \\
      python-dev \\
      sqlite3

  RUN cd /tmp && \\
      git clone https://github.com/facebook/watchman.git && \\
      cd watchman && \\
      git checkout v4.7.0 && \\
      ./autogen.sh && \\
      ./configure && \\
      make && \\
      make install

  RUN npm install -g lux-framework@${version}
`;

const slim = base => stripIndent`
  FROM node:${base}-slim

  RUN npm install -g lux-framework@${version}
`;

const alpine = base => stripIndent`
  FROM node:${base}-alpine

  RUN npm install -g lux-framework@${version}
`;

const onbuild = base => stripIndent`
  FROM zacharygolba/lux-framework:${version + (
    base === 7 ? `:node-${base}` : ''
  )}

  RUN mkdir -p /usr/src/app
  WORKDIR /usr/src/app
  VOLUME ["/usr/src/app"]

  ONBUILD COPY . /usr/src/app
  ONBUILD RUN npm install

  EXPOSE 4000

  CMD ["lux", "serve"]
`;

ls('.')
  .filter(file => /^\d\.\d$/.test(file))
  .forEach(file => rm('-rf', file));

mkdir(`${version}`, `${version}/node-7`);
echo(`${main(6)}\n`).to(`${version}/Dockerfile`);
echo(`${main(7)}\n`).to(`${version}/node-7/Dockerfile`);

[slim, alpine, onbuild].forEach(template => {
  const { name } = template;

  mkdir(`${version}/${name}`, `${version}/node-7/${name}`);
  echo(`${template(6)}\n`).to(`${version}/${name}/Dockerfile`);
  echo(`${template(7)}\n`).to(
    `${version}/node-7/${name}/Dockerfile`
  );
});
