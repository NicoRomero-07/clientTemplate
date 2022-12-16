import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { getCoords} from "../../api/FetchOpenData";
import { getParadasByCodLineaAndSentido, getParadasByNombre, getNearParadas } from "../../api/FetchDB";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const MapForm = ({ setMarkers, setMarkers1, setMarkers2 }) => {

  const { user/* ,getAccessTokenSilently */ } = useAuth0();
  
  const [logs, setLogs] = useState([]);

  const printLogs = () => {
    console.log(logs);
  }

  const [formData, setFormData] = useState({
    parada: 1,
    sentido: 1,
  });

  const [formData1, setFormData1] = useState({
    nombre: "",
  });

  const [formData2, setFormData2] = useState({
    direccion: "",
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
    const paradas = await getParadasByCodLineaAndSentido(formData.parada, formData.sentido);
    const date = new Date();
    const actuallog = `${date.toDateString}  ${user.email}   /parada/search/codLinea?codLinea=${formData.parada}&sentido=${formData.sentido}`;  
    setLogs([
      ...logs,
      {log:actuallog}
    ]);
    setMarkers(paradas);
    setIsLoading(false);
  };

  const submitHandler1 = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const paradas = await getParadasByNombre(formData1.nombre);
    const date = new Date();
    const actuallog = `${date.toDateString}   ${user.email}   /parada/search/nombreLinea?nombreLinea=${formData.nombre}`  
    
    setLogs([
      ...logs,
      {log:actuallog}
    ]);
    setMarkers1(paradas);
    setIsLoading(false);
  };

  const submitHandler2 = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const {lat,  lon} = await getCoords(formData2.direccion)
    const paradas = await getNearParadas(lat, lon);
    
    setMarkers2(paradas);
    setIsLoading(false);
  }
  const updateFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const updateFormData1 = (event) => {
    const { name, value } = event.target;
    setFormData1((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  const updateFormData2 = (event) => {
    const { name, value } = event.target;
    setFormData2((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div>
        <Form onSubmit={submitHandler}>
          <Row>
            <Form.Group className="mb-4" controlId="formAddress">
              <Form.Label>Cod Parada</Form.Label>
              <Form.Control
                type="number"
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
              type="number"
              placeholder="Introduzca un sentido"
              name="sentido"
              onChange={updateFormData}
            />
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Button className="mt-5 ms-3 w-25 h-25" variant="primary" type="submit">
            {isLoading ? spinner() : "Submit"}
          </Button>
        </Row>
      </Form>
    </div>
  <div>
    <Form onSubmit={submitHandler1}>
    <Row>
      <Form.Group className="mb-4" controlId="form1">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca un nombre"
          name="nombre"
          onChange={updateFormData1}
        />
      </Form.Group>
    </Row>
    <Row className="mt-4">
      <Button className="mt-5 ms-3 w-25 h-25" variant="primary" type="submit">
        {isLoading ? spinner() : "Submit"}
      </Button>
    </Row>
    </Form>
  </div>
  <div>
    <Form onSubmit={submitHandler2}>
    <Row>
      <Form.Group className="mb-4" controlId="form1">
        <Form.Label>Direccion</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca una direccion"
          name="direccion"
          onChange={updateFormData2}
        />
      </Form.Group>
    </Row>
    <Row className="mt-4">
      <Button className="mt-5 ms-3 w-25 h-25" variant="primary" type="submit">
        {isLoading ? spinner() : "Submit"}
      </Button>
    </Row>
    </Form>
  </div>
  
  <Button type="button" onClick={printLogs(logs)}> MOSTRAR LOGS</Button>
  </>
  );
};
