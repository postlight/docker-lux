# docker-lux

[![Greenkeeper badge](https://badges.greenkeeper.io/postlight/docker-lux.svg)](https://greenkeeper.io/)

The official Docker image for [Lux](https://github.com/postlight/lux).

## Usage

Create a Dockerfile in the root of your [Lux](https://github.com/postlight/lux) project directory.

```dockerfile
FROM zacharygolba/lux-framework:latest-onbuild
```

You can then build and run the Docker image:

```bash
docker build -t my-lux-app .
docker run -it --rm --name my-running-app my-lux-app
```

## Image Variants

The `lux-framework` images mirror the format of the official [Node.js](https://nodejs.org) Docker images. For more information on the different image formats, see the [image variants](https://github.com/nodejs/docker-node#image-variants) section of the official [Node.js](https://nodejs.org) docker repo.

### `lux-framework:<version>`

This image will only install [Node.js](https://nodejs.org), [Lux](https://github.com/postlight/lux), and their dependencies. Use this image if you need to customize your environment before running your application.

#### Example Dockerfile:

```dockerfile
FROM zacharygolba/lux-framework:latest

RUN mkdir -p /usr/src/my-lux-app
WORKDIR /usr/src/my-lux-app

COPY package.json /usr/src/my-lux-app
RUN npm install
COPY . /usr/src/my-lux-app

EXPOSE 4000

CMD ["lux", "serve"]
```

### `lux-framework:onbuild`

This image contains all of the logic to get a standard [Lux](https://github.com/postlight/lux) project dockerized with little to no effort. If all you need to do in your Dockerfile is get your application up and running, you should use this image.

Since the `ONBUILD` triggers can be unpredictable, it is recommended that you use the basic `lux-framework:<version>` image if you need to run additional commands to get your application environment running.

#### Example Dockerfile:

```dockerfile
FROM zacharygolba/lux-framework:latest-onbuild
```

### `lux-framework:slim`

This image is essentially the same as `lux-framework:<version>` except it builds on the `node:slim` image which only contains the bare bones to run a [Lux](https://github.com/postlight/lux) application. You will most likely have to install additional packages from your Dockerfile if you use this image.

#### Example Dockerfile:

```dockerfile
FROM zacharygolba/lux-framework:latest-slim

RUN mkdir -p /usr/src/my-lux-app
WORKDIR /usr/src/my-lux-app

COPY package.json /usr/src/my-lux-app
RUN npm install
COPY . /usr/src/my-lux-app

EXPOSE 4000

CMD ["lux", "serve"]
```
