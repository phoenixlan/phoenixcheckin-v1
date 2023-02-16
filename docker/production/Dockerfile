FROM node:current as build

ARG API_URL
ARG API_OAUTH_CLIENT_ID
ARG APP_HOST
ARG APP_PROTOCOL

COPY . .
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /public /usr/share/nginx/html
COPY --from=build /docker/production/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx"]


