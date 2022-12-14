import { MapForm } from "./MapForm";
import { ClimateInfo } from "./ClimateInfo";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { LayersControl, LayerGroup } from "react-leaflet";

const MyMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    //Center map on position
    map.flyTo([position.lat, position.lng], 16.5);
  }, [position, map]);

  return null;
};

export const Map = () => {
  const [position, setPosition] = useState({
    lat: 41.3851,
    lng: 2.1734,
  });

  const [markers, setMarkers] = useState([]);
  const forecastPanelPosition = "leaflet-control leaflet-bottom leaflet-left";

  return (
    <>
        <div className="min-vh-50 d-flex p-5 flex-column flex-lg-row m-5 align-items-center justify-content-evenly gap-5 ">
          <MapContainer
            className="rounded-5 order-lg-last ms-5"
            style={{
              height: "600px",
              width: "100%",
            }}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
          >
            {/* <ClimateInfo position={forecastPanelPosition} /> */}

            <MyMap position={position} />

            {/* <LayersControl position="topright">
              <LayersControl.Overlay checked name="Household Marker">
                <LayerGroup>
                  {householdMarkers && (
                    <HouseholdMarkers requestData={householdMarkers} />
                  )}
                </LayerGroup>
              </LayersControl.Overlay>

            </LayersControl>
 */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
         {/*  <MapForm
            setPosition={setPosition}
            setMarkers={setMarkers}
          /> */}
        </div>
    </>
  );
};
