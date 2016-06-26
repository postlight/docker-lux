FROM zacharygolba/lux-framework:1.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY package.json /usr/src/app
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/app

EXPOSE 4000

CMD ["lux", "serve"]
