FROM nginx:1.14-alpine

# https://stackoverflow.com/questions/51378080/containerized-reactjs-application-from-nginx-image-does-not-serve-all-routes
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY build /usr/share/nginx/html

# Activate the http basic auth and set the password depending on the AUTHSWITCH and HTPASSWD environment variables
CMD ["/bin/bash", "-c", "echo $HTPASSWD >/etc/nginx/conf.d/.htpasswd && envsubst '$AUTHSWITCH'< /etc/nginx/conf.d/default_conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
