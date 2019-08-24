# Splink - Slack Bot

This application helps manage your favorite compute resources all through chat. 

## Getting Started

- Clone this repository
- Create a dotenv file `.env` and supply the credentials under [Environment Variables](#environment-variables)
- Replace all credentials required for cloud services.

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

* `index.js` - Main application code
* `service/<platform>/*.js` - services used to fetch information from respective cloud platforms. 

## Built With

-  Node

```Dockerfile
FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN ["chmod", "+x", "/usr/src/app/wait-for-it.sh"]
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
    container_name: splink
    restart: on-failure
    build: .
    depends_on:
      - mongo
    command: ["./wait-for-it.sh", "mongo:27017", "--", "node", "index.js"]
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
