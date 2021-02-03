<!--[![Coverage Status](https://coveralls.io/repos/github/andersonluizpereira/clean-node-api/badge.svg?branch=master)](https://coveralls.io/github/andersonluizpereira/clean-node-api?branch=master) -->
[![Build Status](https://travis-ci.com/andersonluizpereira/clean-node-api.svg?branch=master)](https://travis-ci.com/andersonluizpereira/clean-node-api)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## Comandos
| ---------------------------- | --------------------------------- |
| Comando                      | Descrição                         |
| ---------------------------- | --------------------------------- |
| npm run test                 | Running test                      |
| npm run start                | Running project                   |
| ---------------------------- | --------------------------------- |

## Used Patterns
- TDD
- Clean Architecture

![clean-architecture-nodets](https://github.com/andersonluizpereira/journal-notify-typescript/blob/master/public/img/cleanarch.jpg)
> ## Princípios aplicados

* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Don't Repeat Yourself (DRY)
* Composition Over Inheritance
* Small Commits

> ## Design Patterns aplicados

* Factory
* Adapter
* Composite
* Decorator
* Proxy
* Dependency Injection
* Abstract Server
* Composition Root

> ## Metodologias/designs utilizados

* TDD
* Clean Architecture
* DDD
* Conventional Commits
* GitFlow
* Modular Design
* Dependency Diagrams
* Use Cases
* Continuous Integration
* Continuous Delivery
* Continuous Deployment

> ## Bibliotecas e ferramentas utilizadas

* NPM
* Typescript
* Git
* Docker
* Jest
* MongoDb
* Travis CI
* Coveralls
* Bcrypt
* JsonWebToken
* Validator
* Express
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style

Create User

curl --location --request POST 'http://localhost:5859/api/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Anderson Pereira",
    "email": "andy2903.alp@gmail.com",
    "password": "12345",
    "passwordConfirmation": "12345"
}'

Login User

curl --location --request POST 'http://localhost:5859/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "andy2903.alp@gmail.com",
    "password": "12345"
}'
