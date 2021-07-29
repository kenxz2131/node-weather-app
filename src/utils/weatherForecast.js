const request = require(`request`);

const weatherForecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5527a6f82b036e47e7640faf93c52a38&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to weather services.`, undefined);
    } else if (body.error) {
      callback(`Unable to find location.`, undefined);
    } else {
      const {
        weather_descriptions: [descrip],
        temperature,
        precip,
      } = body.current;
      const { lat, lon, country } = body.location;
      callback(
        undefined,

        `${descrip}. It is ${temperature} degrees out and there is a ${precip}% chance of rain. The coordinates are ${lat}, ${lon} located at the ${country}.`
      );
    }
  });
};

module.exports = weatherForecast;
