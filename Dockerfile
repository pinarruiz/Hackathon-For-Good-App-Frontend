FROM registry.gitlab.com/pinarruiz/projects/images/node-js-base:17.7.1-alpine as executor

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Europe/Madrid /etc/localtime
RUN echo "Europe/Madrid" >  /etc/timezone
RUN apk del tzdata

RUN addgroup -S hackathon && adduser -H -D -S hackathon hackathon

WORKDIR /app

COPY yarn.lock ./yarn.lock
COPY package-lock.json ./package-lock.json
COPY next.config.js ./next.config.js
COPY package.json ./package.json
COPY public ./public
COPY node_modules ./node_modules
COPY .next ./.next
COPY lib ./lib
RUN chown -R hackathon:hackathon .

USER hackathon

CMD ["yarn", "start", "--hostname", "0.0.0.0"]

EXPOSE 3000