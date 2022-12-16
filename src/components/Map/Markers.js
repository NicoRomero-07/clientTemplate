import React from 'react';
import { Marker } from 'react-leaflet';
import { iconPerson } from './markerLeafLet';


export const MarkersComponent = ({ requestData }) => {
    return (
        <>
        {requestData.map((element,idx) => (
            <Marker
            key={idx}
            position={[element.lat, element.geojson.lon]}
            icon={iconPerson}
            >
            {/* <Popup>
                <h5>{element.name}</h5>
                <p>{element.description}</p>
                <p>{element.address}</p>
            </Popup> */}
            </Marker>
        ))}
        </>
    );
    }