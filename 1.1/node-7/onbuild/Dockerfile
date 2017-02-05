FROM zacharygolba/lux-framework:1.1:node-7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
VOLUME ["/usr/src/app"]

ONBUILD COPY . /usr/src/app
ONBUILD RUN npm install

EXPOSE 4000

CMD ["lux", "serve"]
