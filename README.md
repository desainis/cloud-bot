# CBot - Slack Bot

This application helps manage your favorite compute resources all through chat. 

## Getting Started

- Clone this repository
- Rename `.env.sample` to `.env`
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

```bash
docker-compose up
```

- How to open a shell inside the cbot image

```bash
docker run -it cbot bash
```

- Run it in detached mode (in the background)

```bash
docker-compose -d
```

#### Teardown

- Run it in detached mode (in the background)

```bash
docker-compose down
```
#### Environment Variables

* TBD

#### Volumes

- `./data/db:/data/db`

#### Useful File Locations

* `index.js` - Main application code

## Built With

-  Node

```Dockerfile
FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
```

- MongoDB
```yml
version: '3'
services:
  app:
    container_name: cbot
    restart: always
    build: .
    ports:
      - '80:3000'
    links: 
      - mongo
  mongo:
    container_name: mongo
    image: mongo
    ports:
      - '27017:27017'
```

## Network Specifications

### Ports
- Application: `80:3000`
- MongoDB: `27017:27017`

## Find Us

* [GitHub](https://github.com/desainis/cloud-bot)
* [Quay.io](coming-soon)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the 
[tags on this repository](https://github.com/desainis/cloud-bot/tags). 

## Authors

* **Nishant Desai** - *Initial work* - [Cbot](https://github.com/desainis/cloud-bot)

See also the list of [contributors](https://github.com/desainis/cloud-bot/contributors) who 
participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* God Bless Free Tier(s)