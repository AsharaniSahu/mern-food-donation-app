FROM nginx

COPY Frontend/dist /usr/share/nginx/html

EXPOSE 80
