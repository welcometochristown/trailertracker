const config = require("./config");

const reciever = require("./geoReciever");
const api = require("./geoApi");

reciever(config.geoRecieverPort);
api(config.geoApiPort);
