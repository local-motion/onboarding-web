FROM nginx

# https://stackoverflow.com/questions/51378080/containerized-reactjs-application-from-nginx-image-does-not-serve-all-routes
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY build /usr/share/nginx/html