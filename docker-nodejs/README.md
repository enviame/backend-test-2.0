# Project Name: NodeJS Clean Architecture Microservices Templates

### Description

The template was structured following the principles defined by [clean architecture](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/).

The base template written with NodeJS using Express, Sequelize, Firestore, MySQL and Redis.

Each service has his own database, but the schema, user, password params are the same for both.

In this example, each application contains two sections: one called "greeting", which is simply an endpoint that returns a greeting indicating the visitor's number, which is obtained from a cache, and the other is "books", which consists of a CRUD of books, which are stored in a database, either in MySQL or in Firestore.

Being a NodeJS project, the following conventions are followed:

- Two-space identation (no tabs), even in non-`.js` files.
- Class names in `UpperCamelCase`.
- Methods, functions and variables in `camelCase`.
- Module names (`.js` files) in `kebab-case`.
- Package names (folders) in `lowercase`, no underscores even if they contain more than one word (eg" usecases "instead of" use_cases ").

### Construction 🛠️
* **Language:** NodeJS 14
* **Framework:** Express, Sequelize, Firestore, Redis.

## Requirements
- Docker installed

## Installation and execution

- Clone or Fork the project.
- Copy **.env.example** to **.env**. It will be used as environment variables source.
- Inside Docker/app folders of ecommerce-service and delivery-services:
* Copy **.env.example** to **.env**. It will be used as environment variables source.

Run ```docker-compose``` command inside **docker-nodejs** folder.

* Building the containers: ```docker-compose build```

* Starting the services: ```docker-compose up -d```

* Stoping the services: ```docker-compose stop```

By default the microservices will run under the following ports:
- ecommerce-service: 8000
- delivery-service: 8001

Check the **.env.example** file to change these or any other params.

#### Note

The NodeJS application will probably throw an exception the first time, because it will try to connect to the MySQL service that is still initializing for the first time; in this case wait for MySQL to fully initialize first and then run the command `docker-compose restart $NAME_SERVICE` in another terminal to restart the crashed service.

### Testing ⚙️

To run manual tests, the `req.http` file is included with requests to localhost. Install `REST Client` for Visual Studio Code or` RESTer HTTP Client` for Sublime Text to be able to perform file requests from the same text editor.

To run the tests:

- Have the services running using `docker-compose up`.
- In another console, run `docker exec ecommerce-service npm test`.

Repository tests write data to container databases, but write them to temporary tables or collections with the suffix "\ _test" that are deleted once they are finished, so as not to carry the actual data. Bear in mind that in the case of Firestore there is no data persistence yet; if the service is lowered and raised again, the previous data is lost.

### Autores ✒️

* **Autor:** Hans Auzian C., hans.auzian@enviame.io
