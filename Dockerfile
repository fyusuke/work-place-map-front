FROM node:12.18.3-alpine

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package*.json ./

RUN apk update && \
  npm install -g npm && \
  npm install && \
  npm install -g @vue/cli

CMD ["/bin/bash"]

# RUN apk update && npm install -g @vue/cli
# RUN apk update
# COPY package.json .
# RUN npm install
