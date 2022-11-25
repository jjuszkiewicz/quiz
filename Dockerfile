FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as prod

COPY --from=build /app/build /var/www/quiz
ADD nginx/sites/* /etc/nginx/conf.d/

EXPOSE 3000
