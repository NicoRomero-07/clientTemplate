import { CardGroup, Container, Row } from "react-bootstrap";
import {getData } from "../../../src/api/FetchDB";
import CardComponent from "../Card/Card";
import { useEffect, useState } from "react";

export const AlbumComponent = () => {

    const [data, setData] = useState([
      {
        id: "",
        name: "Data",
        image: "urlImg",
        geojson: {
            type: "Point",
            coordinates: [0, 0],
        },
        description: "Texto de prueba"
      
    }]);

    useEffect(() => {
      const temp = async () => {
        setData(await getData())
      }
      temp()
    }, []);

  return (
    <CardGroup className="py-5 bg-white">
      <Container>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {data.map((element) => (
            <CardComponent key={element.id}
              element={element}
            ></CardComponent>
          ))}
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;