const net = require("net");
const gprmcParser = require("./parseGPRMC");
const { insert } = require("./database");

//create a tcp server
const server = net.createServer(function (socket) {
  socket.on("data", (data) => {
    var gprmc = gprmcParser(data.toString());
    console.log(gprmc); //so we can make sure our server is recieving data from host
    insert(gprmc.geo);
  });
});

const start = (port) => {
  //start geolocation server
  server.listen(port, () => {
    console.log(`Geolocation Reciever server listening on port ${port}...`);
  });
};

module.exports = start;
