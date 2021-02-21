# Restaurant Finder Web App

A basic Restaurant Finder Web App
This project is a [Node.js](https://nodejs.org/en/docs/) app using [Express 4](http://expressjs.com/) and [MongoDB]

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.
For adding documents in DB, make sure DB is running [MongoDB] (& "Path of mongod.exe" --dbpath="Path of mongodb-data")

```sh
git clone git@github.com:IamRohitRamesh/javascript-assignment.git # or clone your own fork
cd restaurant-finder-app
npm install
npm start
```

Your app will be running on [localhost:3000](http://localhost:3000/).

## Basic Features

- Owner should be able to add restaurant with basic information (name, location), cuisines and dishes
- User must select the city he’s looking to search the restaurant
- The listing page must display the paginated restaurants
- On viewing the restaurant, it should display all the relevant information

## Advanced Features

- Implementing search by restaurant name, dishes
- Implementing filter by location, cuisine.

## Additional Features

- Both Users and Owners are binded with JWT token which offers authentication, authorization and complete privacy of data

## PostMan Collection

- URL : <https://www.getpostman.com/collections/b8c8ff980f5ba61a40f3>
