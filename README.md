[![Build Status](https://travis-ci.org/local-motion/onboarding-web.svg?branch=master)](https://travis-ci.org/local-motion/onboarding-web)

## Build docker image

```commandline
npm run-script build  
docker build -t onboarding-web .
```

## Run docker image
```commandline
docker run --rm -it -p 8080:80 onboarding-web 
open http://localhost:8080
open http://localhost:8080/workspace
```

## Nginx development cycle

If you're in need of changing the Nginx configuration, consider using
the following local development cycle:

_Make sure you've altered `docker-compose.yml` to use the `:local` tag_

```
Local development cycle for changing nginx:

    1. In your terminal `cd` to `bootstrap/development`
    2. Change `default.conf` in your favourite editor
    3. In your terminal: `pushd ../../onboarding-web && docker build -t localmotion/onboarding-web:local . && popd && docker-compose up -d`
    4. Rinse-and-repeat

```

If you want to verify your changes made it into the container:
```
docker exec -it $(docker ps -a | grep onboarding-web | awk '{print $1}') cat /etc/nginx/conf.d/default.conf
```

Or, access the newly built container directly:
```
docker exec -it $(docker ps -a | grep onboarding-web | awk '{print $1}') /bin/bash
```