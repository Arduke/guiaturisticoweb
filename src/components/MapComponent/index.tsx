import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  LoadScript,
  DirectionsService,
  Marker,
} from "@react-google-maps/api";
import { useEffect } from "react";

interface Coords {
  lat: number;
  lng: number;
}

interface IProps {
  lat: any;
  lng: any;
}

const MyMap: React.FC<IProps> = ({ lat, lng }) => {
  const [response, setResponse] = useState(null);
  const [originLat, setLat] = useState<number | null>(null);
  const [originLng, setLng] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  }, []);

  let destination: Coords = {
    lat: Number(lat),
    lng: Number(lng),
  };

  let origin = {
    lat: Number(originLat),
    lng: Number(originLng),
  };

  const directionsCallback = (response: any) => {
    if (response !== null && response.status === "OK") {
      setResponse(response);
    }
  };

  return (
    <div className="googleMap">
      <LoadScript googleMapsApiKey="AIzaSyCTBSgVbSHEIMoxutFSSUXC4DNEg3SfCC8">
        <GoogleMap
          center={destination}
          mapContainerStyle={{ width: "100%", height: "500px" }}
          zoom={14}
        >
          <Marker position={destination} />
          {destination && origin !== null && (
            <DirectionsService
              options={{
                origin: origin,
                destination: destination,
                travelMode: "DRIVING",
              }}
              callback={directionsCallback}
            ></DirectionsService>
          )}
          {destination && origin && response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MyMap;
