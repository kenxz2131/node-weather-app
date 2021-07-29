const request = require(`request`);

const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1Ijoia2VueHoyMTMxIiwiYSI6ImNrcm1ydTFxODFoYzgybm9iMXlzbzJhZXkifQ.n1A4Axuz95B4IfZb6biXpA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to location services!`, undefined);
    } else if (body.features.length === 0) {
      callback(`Unable to get coordinates. Try another location.`, undefined);
    } else {
      const {
        center: [longitude, latitude], //To distruct array in an object
        place_name: location,
      } = body.features[0];
      callback(
        undefined,

        {
          latitude,
          longitude,
          location,
        }
      );
    }
  });
};

module.exports = geocode;
