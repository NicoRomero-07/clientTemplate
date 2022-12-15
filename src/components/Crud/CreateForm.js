import Row from "react-bootstrap/esm/Row";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import CloudinaryUploadWidget from "../Cloudinary/UploadCloudinary";
import { postData } from "../../api/FetchDB";

export const CreateForm = ( ) => {

    const [formData, setFormData] = useState({
        name: "",
        lat: 500,
        long: 500,
    });
    
    const [urlImg, setUrlImg] = useState({
        urlImg: "https://via.placeholder.com/150",
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
        const { name, lat, long } = formData;
        const data = {
            name: name,
            image: urlImg,
            geojson: {
                type: "Point",
                coordinates: [long, lat],
            },
            description: "Texto de prueba"
        }
        console.log(data);
        const res = await postData(data);
        console.log(res);
        setIsLoading(false);
    };

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
        <>
        <div>
            Seleccione una imagen
            <CloudinaryUploadWidget setUrlImg={setUrlImg}/>
            <img src={urlImg ? urlImg : "https://via.placeholder.com/150"} alt="img" width="300" height="300"/>
        </div>
        <Form onSubmit={submitHandler}>
          <Row>
            <Form.Group className="mb-4" controlId="formData">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduzca un nombre"
                name="name"
                onChange={updateFormData}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="mb-4" controlId="formLatLong">
              <Form.Label>Latitud</Form.Label>
              <Form.Control
                type="number"
                placeholder="Introduzca latitud"
                name="lat"
                onChange={updateFormData}
              />
              <Form.Label>Longitud</Form.Label>
              <Form.Control
                type="number"
                placeholder="Introduzca longitud"
                name="long"
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
        </>
    );
}