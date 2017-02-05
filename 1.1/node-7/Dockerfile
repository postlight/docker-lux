FROM node:7

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    python-dev \
    sqlite3

RUN cd /tmp && \
    git clone https://github.com/facebook/watchman.git && \
    cd watchman && \
    git checkout v4.7.0 && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install

RUN npm install -g lux-framework@1.1
