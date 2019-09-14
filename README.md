# Splink - Slack Bot
[![CircleCI](https://circleci.com/gh/desainis/splink/tree/master.svg?style=svg)](https://circleci.com/gh/desainis/splink/tree/master)

Simplyfying day to day operations through chatops. 

![splink-image-icon-logo](https://storage.googleapis.com/splink/splink-icon.png)

## Getting Started

- Authorize this app for your slack workspace
- Send us your encrypted credentials using GPG with our public key below. 

<details>

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
FkaHV9aIFYKdouhNwNobiUcQdig/KAOPYQ==
=oaoH
-----END PGP PUBLIC KEY BLOCK-----
```

</details>

- Type `splink [aws|gcp|do|ibmcloud] setup` to setup access controls (alternately type `splink help` and use the dialog setup). 
- Once the app authorizes the respective service, you're all setup! 


### Prerequisities

In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

An API key (service account) from your favorite cloud provider(s). 

* [Google Cloud Platform](https://cloud.google.com/compute/docs/access/service-accounts)
* [AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html#id_users_service_accounts)
* [Digital Ocean](https://developers.digitalocean.com/documentation/v2/)
* [IBM Cloud](https://cloud.ibm.com/docs/iam?topic=iam-serviceids)

### Usage

#### Google Cloud Compute Engine

- `splink gcp vm list`: List's all virtual instances _that the service account has access to_ in your Google Cloud Platform project. 
- `splink gcp vm create`: Create a VM in your GCP project
- `splink gcp vm stop <name|regex|ip>`: Stops a set of GCP instances using its name, regex, or _private ip_
- `splink gcp vm start <name|regex|ip>`: Starts a set of GCP instances using its name, regex, or _private ip_
- `splink gcp vm reboot <name|regex|ip>`: Reboots a set of GCP instances using its name, regex, or _private ip_

#### Google Cloud Kubernetes Engine

- `splink gcp k8 list`: Lists all kubernetes clusters _that the service account has access to_ in your Google Cloud Platform project
- `splink gcp k8 create`: Creates a kubernetes clusters in your GCP Project

#### Container Parameters

#### Build

```console
docker-compose up
```

- How to open a shell inside the splink image

```console
docker run -it splink bash
```

- Run it in detached mode (in the background)

```console
docker-compose -d
```

- Build only
```console
docker-compose build
```

- Build and Run
```console
docker-compose up --build
```

#### Teardown

- Run it in detached mode (in the background)

```console
docker-compose down
```
#### Environment Variables

- `token` - Slack OAuth token for bot user. For more information see [Slack Documentation](https://api.slack.com/docs/oauth)


#### Volumes

- `./data/db:/data/db`

#### Useful File Locations

- `index.js` - Main application code
- `lib/*` - custom libraries used in the app
- `gcloud/*` - services used to maintain GCP resources

## Built With

-  Node

```Dockerfile
FROM node:12-slim

WORKDIR /usr/src/app/

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && node index.js
```

- MongoDB
```yml
version: '3'
services:
  mongo:
    container_name: mongo
    image: mongo
    ports:
      - '27017:27017'
    volumes:
      - ./data/db:/data/db
  app:
    container_name: app
    restart: on-failure
    build: .
    depends_on:
      - mongo
    environment:
      WAIT_HOSTS: mongo:27017
```

## Network Specifications

### Ports
- MongoDB: `27017:27017`

## Find Us

* [GitHub](https://github.com/desainis/splink)
* [Quay.io](coming-soon)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Learn More

Please read the documentation on the client libraries below:

* [NodeJS Client](https://googleapis.dev/nodejs/compute/latest/index.html#reference) for Google Cloud Platform

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the 
[tags on this repository](https://github.com/desainis/splink/tags). 

## Authors

* **Nishant Desai** - *Initial work* - [Splink](https://github.com/desainis/splink)

See also the list of [contributors](https://github.com/desainis/splink/contributors) who 
participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* God Bless Free Tier(s)
