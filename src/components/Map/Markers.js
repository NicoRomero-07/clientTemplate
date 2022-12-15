import React from 'react';
import { Marker } from 'react-leaflet';
import { iconPerson } from './markerLeafLet';


export const MarkersComponent = ({ requestData }) => {
    return (
        <>
        {requestData.map((element,idx) => (
            <Marker
            key={idx}
            position={[element.geojson.coordinates[1], element.geojson.coordinates[0]]}
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