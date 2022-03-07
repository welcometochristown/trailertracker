# trailertracker

Simple receiver and web app for geolocation tracking.

# How it works

There are 3 parts to getting getting this project up and running.

## GPS Receiever server

This server runs listening for tcp packets from the geo location device.The packets are parsed and geolocation data is stripped out and saved to our database.

## Geolocation Api Server

This server provides the location data to our front end.

## Web Application Front End

A react application displaying the google maps interface with a line mapped from our geolocation data obtained from the api server.

# Requirements

To run this project you will need the following things -

1). A server to host the gpsreciever and api (I used a small lightsail ubunutu instance on aws)
https://aws.amazon.com/lightsail/

2). A google maps api (paid service)
https://developers.google.com/maps/documentation/javascript/overview

3). A device capable of sending geolocation data (I'm using a pepwave transit duo MAX)
https://www.peplink.com/products/max-transit-duo/

4). A database of some kind. My project is setup to use mongodb which is free. If you use something else you will need to update the database connections.
https://www.mongodb.com/

# Setup

I will run through the steps I used for my configuration, these may differ depending on the setup you have.

Setup is pretty easy, you will need to clone a copy of the project to your hosting server. There are two sub projects. Both projects have a config.json file that will need configuring before deployment.

## app

```json
  "googleApiKey": "<your_google_api_key>",
  "locationServer": "<api_url>/location",
```

googleApiKey - this is the api key provided by google api services
locationServer - this is the full url of the api server geolocation end point (in the server project)

## server

```json
  "mongodb": {
    "user": "",
    "pass": "",
    "cluster": "",
    "db": ""
  },
```

These are the connection parameters required for mongodb. The server uses the mongoose libraries to connect to the my mongodb cluster.

Note : If you are having problems connnecting make sure that your ip address has been whitelisted in the Network Access section for your cluster on MongoDb.
