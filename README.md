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
