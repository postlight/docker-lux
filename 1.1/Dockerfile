FROM node:6

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | \
    apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | \
    tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -y && \
    apt-get install -y \
    build-essential \
    python-dev \
    sqlite3 \
    libelf1 \
    yarn && \
    cd /tmp && \
    git clone https://github.com/facebook/watchman.git && \
    cd watchman && \
    git checkout v4.7.0 && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install && \
    yarn global add lux-framework@1.1
