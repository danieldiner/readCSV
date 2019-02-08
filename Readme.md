# Covela challenge scrapping
> This project is about scrapping data from Naruto wikia character page.

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

## Deployment

This project is actually hosted on heroku.
more info here :
https://devcenter.heroku.com/articles/getting-started-with-nodejs
The job that permits to send a request every day is host on zappier
ñore info here :
https://zapier.com/apps/schedule/integrations


## Built With

* [expressjs](http://expressjs.com/es/)
* [mongodb](https://www.mongodb.com/)
