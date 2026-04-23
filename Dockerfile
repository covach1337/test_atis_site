FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
