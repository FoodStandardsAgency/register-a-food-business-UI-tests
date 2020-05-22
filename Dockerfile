# specify the node base image with your desired version node:<version>
FROM node:12.14
ARG NPM_TOKEN
ARG http_proxy
ARG https_proxy
RUN echo $http_proxy

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y wget unzip

RUN wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip && \
    unzip BrowserStackLocal-linux-x64.zip && \
    rm BrowserStackLocal-linux-x64.zip && \
    chmod +x /BrowserStackLocal

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN chmod u+x /usr/src/app/docker_init.sh

ENV PATH="//usr/local/bin:${PATH}"



ENTRYPOINT ["/usr/src/app/docker_init.sh"]
