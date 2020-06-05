FROM openjdk:13-ea-alpine3.10
LABEL maintainer="Pedro Sanders <fonosterteam@fonoster.com>"

COPY package.json /ex-rest-registration/
COPY index.js /ex-rest-registration/
COPY calc_response.js /ex-rest-registration/
WORKDIR /ex-rest-registration/

RUN apk add --update nodejs npm ;\
  npm rebuild ; \
  npm -g install . ; \
  rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

CMD ["/bin/sh", "-c", "run-server"]
