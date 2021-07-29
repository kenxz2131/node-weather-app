// Comman line: nodemon src/app.js -e js,hbs //-e means extension the js,hbs means to include files with js and hbs extensions
const geocode = require(`./utils/geocode.js`);
const weatherForecast = require(`./utils/weatherForecast`);

const path = require(`path`);
const express = require(`express`);
const hbs = require(`hbs`);
// console.log(__dirname); //Shows the current directory
// console.log(path.join(__dirname, `../public`)); //Allows to locate desired directory

const app = express(); //Uses the express server

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, `../public`);
const viewsPath = path.join(__dirname, `../templates/views`);
const partialsPath = path.join(__dirname, `../templates/partials`);

//Setup handlebars engine and views location
app.set(`view engine`, `hbs`);
app.set(`views`, viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //takes the path

app.get(``, (req, res) => {
  res.render(`index`, {
    title: `Weather App`,
    name: `Kenneth`,
  });
});

app.get(`/about`, (req, res) => {
  res.render(`about`, {
    title: `About Me`,
    name: `Kenneth`,
  });
});

app.get(`/help`, (req, res) => {
  res.render(`help`, {
    title: `Help`,
    name: `Kenneth`,
  });
});

app.get(`/weather`, (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: `No address!`,
    });
  } else {
    geocode(
      req.query.address,
      (geocodeError, { latitude, longitude, location } = {}) => {
        if (geocodeError) {
          return res.send({ geocodeError });
        } else {
          weatherForecast(
            latitude,
            longitude,
            (forecastError, forecastData) => {
              if (forecastError) {
                return res.send({ forecastError });
              } else {
                res.send({
                  location,
                  forecast: forecastData,
                  address: req.query.address,
                });
              }
            }
          );
        }
      }
    );
  }
});

app.get(`/products`, (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: `You must provide a search term`,
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get(`/help/*`, (req, res) => {
  res.render(`404`, {
    title: `404`,
    message: `This article does not exist.`,
    name: `Kenneth`,
  });
});

app.get(`*`, (req, res) => {
  res.render(`404`, {
    title: `404`,
    message: `Page not found!`,
    name: `Kenneth`,
  });
});

app.listen(3000, () => {
  console.log(`Server is up on port 3000.`);
});
