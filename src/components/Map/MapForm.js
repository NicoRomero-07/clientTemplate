import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { getCoords} from "../../api/FetchOpenData";
import { getDataNearbyByCoords } from "../../api/FetchDB";
import { getParadasByCodLinea } from "../../api/FetchDB";
import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";

export const MapForm = ({ setPosition, setMarkers }) => {

  const [formData, setFormData] = useState({
    parada: 1,
    sentido: 1,
  });

  const [isLoading, setIsLoading] = useState(false);

  const spinner = () => {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // TODO: Fetch household given the form data (address, startDate, endDate, radius (default to 500m))
    //const {lat,  lon} = await getCoords(formData.parada)
    const paradas = await getParadasByCodLineaAndSentido(formData.parada, formData.sentido);
    //setPosition({ lat: lat, lng: lon });;
    
    console.log(paradas)
    setMarkers(paradas);
    setIsLoading(false);
  };

  // Fetch bus live data every 10s
  const REFRESH_RATE_MS = 10000;

  useInterval(async () => {
    // TODO: Print in map
    // console.log(await getNearbyBuses());
  }, REFRESH_RATE_MS);

  const updateFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Form.Group className="mb-4" controlId="formAddress">
          <Form.Label>Cod Parada</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca un codigo de parada"
            name="parada"
            onChange={updateFormData}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-4" controlId="formAddress">
          <Form.Label>Sentido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca un sentido"
            name="sentido"
            onChange={updateFormData}
          />
        </Form.Group>
      </Row>
     {/*  <Row>
        <Form.Label>Radio de búsqueda</Form.Label>
        <ButtonGroup className="mb-2" name="radius" onClick={updateFormData}>
          <Button variant="primary" name="radius" value={500}>
            500m
          </Button>
          <Button variant="primary" name="radius" value={1000}>
            1000m
          </Button>
        </ButtonGroup>
      </Row> */}
      <Row className="mt-4">
        <Button className="mt-5 ms-3 w-25 h-25" variant="primary" type="submit">
          {isLoading ? spinner() : "Submit"}
        </Button>
      </Row>
    </Form>
  );
};
