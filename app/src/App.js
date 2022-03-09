import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import LoadingContainer from "./LoadingContainer";
import config from "./config.json";

export const App = (props) => {
  const { google } = props;
  const [locations, setLocations] = useState();

  useEffect(() => {
    const loadLocations = () => {
      fetch(config.locationServer)
        .then((response) => response.json())
        .then((data) => {
          setLocations(
            data.map((location) => ({
              lat: location.latitude,
              lng: location.longitude,
            }))
          );
        });
    };

    loadLocations();
  }, []);

  const map = locations ? (
    <Map
      google={google}
      zoom={config.initialZoom}
      maxZoom={config.maxZoom}
      initialCenter={locations[locations.length - 1]}
      streetViewControl={config.streetViewControl}
    >
      <Marker
        icon={{
          url: config.trailerIconUrl,
          anchor: {
            x: config.trailerIconWidth / 2,
            y: config.trailerIconHeight / 2,
          },
        }}
      />
      <Polyline
        geodesic={true}
        options={{
          path: locations,
          strokeColor: config.lineColor,
          strokeOpacity: config.lineOpacity,
          strokeWeight: config.lineWeight,
          icons: [
            {
              offset: "0",
              repeat: "10px",
            },
          ],
        }}
      />
    </Map>
  ) : null;

  return <div className="App">{map}</div>;
};

export default GoogleApiWrapper({
  apiKey: config.googleApiKey,
  LoadingContainer: LoadingContainer,
})(App);
