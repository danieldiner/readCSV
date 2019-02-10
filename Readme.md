# Upload CSV
> This project is about creating an API with endpoints declared [on this repo](https://github.com/a0nguyen/prueba-tecnica-covela).

## Getting Started

You can download this project from git, using git clone

### Prerequisites

You'll need node > 8, npm > 5 and mongodb

### Installing

First, git clone the project.

You'll have to change the uri of mongodb in index.js.
Then run

```sh
npm i
```

```sh
supervisor index.js
```

## Running the tests

In order to run the test, you'll not need extra dependency

### Testing the page

The tests are testing the function used as helpers and the response from controllers

### Running locally the tests

```sh
npm run test
```
### Running locally the project

```sh
npm run dev
```

### Use the endpoints

GET to /apps/register for getting a new token

You can use this token in the headers to GET /industries
GET information of one industry in /industries/:id

The next endpoint will let you update the industries with a CSV uploaded from your device (This endpoint will not require authentication)
GET /industries/upload/noauth 


## Built With

* [expressjs](http://expressjs.com/es/)
* [mongodb](https://www.mongodb.com/)
