import { useParams } from "react-router-dom";
import { getDataById } from "../../api/FetchDB";

import { useState, useEffect } from "react";
import { MDBRow, MDBCol, Container } from "mdbreact";
import { Image } from "react-bootstrap";

export function ReadData() {

    const id = useParams().id;
    
    const [data, setData] = useState(
        {
            id: "",
            name: "Data",
            image: "urlImg",
            geojson: {
                type: "Point",
                coordinates: [0, 0],
            },
            description: "Texto de prueba"
            
        });
        
    useEffect(() => {
        const temp = async () => {
            const data = await getDataById(id)
            setData(data)
        }
        temp()
    },[id]);

    return(
        <Container>
            <MDBRow className="mt-5">
                <h1>{data.name}</h1>
            </MDBRow>
            <MDBRow>
                <MDBCol md="8">
                    <MDBRow>
                        <MDBCol md="11">
                            <MDBRow>
                                <Image
                                src={data.image}
                                style={{
                                    height: "400px",
                                    width: "100%",
                                }}
                                ></Image>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBRow className="mt-3">
                <h4>{data.description}</h4>
                <h4>{data.geojson.coordinates[0]} </h4>
                <h4>{data.geojson.coordinates[1]} </h4>
                </MDBRow>
            </MDBRow>

            </Container>
    );
}