const mongoose = require("mongoose");
const Location = require("./models/location");
const config = require("./config");

const getFixedUnrounded = (v, d) => {
  const itg = v.toString().split(".");
  if (itg.length == 1) return itg[0];
  return `${itg[0]}.${itg[1].substring(0, d)}`;
};

const exec = async (func) => {
  mongoose.connect(
    "mongodb+srv://" +
      config.mongodb.user +
      ":" +
      config.mongodb.pass +
      "@" +
      config.mongodb.cluster +
      "/" +
      config.mongodb.db +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    async (err) => {
      if (err) throw err;
      try {
        return await func();
      } catch (err) {
        console.log(err);
      }
    }
  );
};

const insert = (geo) => {
  exec(() => {
    const toRegex = (geoValue) =>
      new RegExp(
        `^${getFixedUnrounded(geoValue, config.comparePrecision).replace(
          ".",
          "\\."
        )}`
      );

    const getRegexExpression = (geoValue, field) => ({
      $regexMatch: {
        input: { $toString: `$${field}` },
        regex: toRegex(geoValue),
      },
    });

    //create a query to find other similar location entries
    const query = {
      $and: [
        {
          $expr: getRegexExpression(geo.longitude, "longitude"),
          $expr: getRegexExpression(geo.latitude, "latitude"),
        },
      ],
    };

    const existing = await Location.find(query);

    if (existing.length > 0) {
      return;
    }

    var ordinal = 0;

    const lastEntry = await Location.find().sort({ ordinal: -1 }).limit(1);

    if (lastEntry.length > 1) {
      throw new Error(
        "Multiple entries found with the same ordinal, probably corrupted data"
      );
    } else if (lastEntry.length == 1) {
      ordinal = lastEntry[0].ordinal + 1;
    }

    new Location({ ...geo, ordinal }).save();
  });
};

const query = (res) => {
  exec(() => {
    const locations = await Location.find({}).sort({ ordinal: 1 });
    res.send(locations);
  });
};

module.exports = {
  insert,
  query,
};
