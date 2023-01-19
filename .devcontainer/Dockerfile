FROM mcr.microsoft.com/devcontainers/typescript-node:0-18

RUN npm install -g npm
RUN npm install -g yo generator-generator @walts81/generator-ts-npm-pkg @walts81/generator-vuex-ts @walts81/generator-vue3-ts

USER root
RUN mkdir -p /home/node/.config/configstore && \
    echo "optOut: true" > /home/node/.config/configstore/insight-yo.yml && \
    chown -R node:node /home/node

USER node